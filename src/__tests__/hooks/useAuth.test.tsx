import { useAventoClient } from '@/components/core';
import { useAuth } from '@/components/core/hooks/use-auth';
import { act, renderHook } from '@testing-library/react';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// ✅ Mock Dependencies
jest.mock('../../components/core', () => ({
  useAventoClient: jest.fn(),
}));
jest.mock('cookies-next', () => ({
  setCookie: jest.fn(),
  getCookie: jest.fn(),
  deleteCookie: jest.fn(),
}));
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('useAuth Hook', () => {
  let mockClient: any;
  let mockRouter: any;

  beforeEach(() => {
    mockClient = { post: jest.fn() };
    (useAventoClient as jest.Mock).mockReturnValue(mockClient);
    mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    jest.clearAllMocks();
  });

  // ✅ Initial State Tests
  it('should set user to null and isLoading to false if no user in cookies', () => {
    (getCookie as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should load user from cookies if available', () => {
    (getCookie as jest.Mock).mockImplementation((key) => {
      if (key === 'user')
        return JSON.stringify({
          id: '123',
          email: 'duljaelani@gmail.com',
          role: 'user',
        });
      if (key === 'token') return 'mockToken';
      return null;
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toEqual({
      id: '123',
      email: 'duljaelani@gmail.com',
      role: 'user',
    });
    expect(result.current.isLoading).toBe(false);
  });

  // ✅ Login Tests
  //   it("should successfully login and store token & user in cookies", async () => {
  //     const mockUser = { id: "123", email: "duljaelani@gmail.com", role: "user" };
  //     const mockResponse = { data: { access_token: "mockToken", user: mockUser } };
  //     mockClient.post.mockResolvedValue(mockResponse);

  //     const { result } = renderHook(() => useAuth());

  //     await act(async () => {
  //       await result.current.login("duljaelani@gmail.com", "password123");
  //     });

  //     expect(setCookie).toHaveBeenCalledWith("token", "mockToken", { maxAge: 3600, path: "/" });
  //     expect(setCookie).toHaveBeenCalledWith("user", JSON.stringify(mockUser), { maxAge: 3600, path: "/" });
  //     expect(toast.success).toHaveBeenCalledWith("Login successful!");
  //     expect(mockRouter.push).toHaveBeenCalledWith("/upload-document");
  //   });

  it('should fail login if no token is received', async () => {
    mockClient.post.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('duljaelani@gmail.com', 'password123');
    });

    expect(setCookie).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('Login failed');
  });

  it('should handle login error if API request fails', async () => {
    mockClient.post.mockRejectedValue(new Error('Request failed'));

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('duljaelani@gmail.com', 'password123');
    });

    expect(setCookie).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('Login failed');
  });

  // ✅ Logout Tests
  //   it("should successfully logout, delete cookies, and reset user", async () => {
  //     (getCookie as jest.Mock).mockReturnValue(JSON.stringify({ id: "123" }));
  //     mockClient.post.mockResolvedValue({});

  //     const { result } = renderHook(() => useAuth());

  //     await act(async () => {
  //       await result.current.logout();
  //     });

  //     await waitFor(() => expect(deleteCookie).toHaveBeenCalled());

  //     expect(deleteCookie).toHaveBeenCalledWith("token");
  //     expect(deleteCookie).toHaveBeenCalledWith("user");
  //     expect(result.current.user).toBeNull();
  //     expect(toast.success).toHaveBeenCalledWith("Logout successful!");
  //     expect(mockRouter.push).toHaveBeenCalledWith("/");
  //   });

  it('should fail logout and show error toast if API call fails', async () => {
    (getCookie as jest.Mock).mockReturnValue(JSON.stringify({ id: '123' }));
    mockClient.post.mockRejectedValue(new Error('Logout failed'));

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(toast.error).toHaveBeenCalledWith('Logout failed');
  });

  it('should not make API call or delete cookies if user is already null', async () => {
    (getCookie as jest.Mock).mockReturnValue(null);
    mockClient.post.mockResolvedValue({});

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(mockClient.post).not.toHaveBeenCalled();
    expect(deleteCookie).not.toHaveBeenCalled();
  });

  // ✅ Loading State
  it('should call setIsLoading(false) after checking cookies', async () => {
    (getCookie as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      expect(result.current.isLoading).toBe(false);
    });
  });
});
