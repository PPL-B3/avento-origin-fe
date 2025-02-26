'use client'

import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }
    console.log({ email, password });
    alert("Registrasi berhasil!");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <InputField 
        label="Email" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="abc@gmail.com" 
        aria-label="Email"
      />
      <InputField 
        label="Password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Masukkan password" 
        aria-label="Password"
      />
      <InputField 
        label="Konfirmasi Password" 
        type="password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        placeholder="Konfirmasi password" 
        aria-label="Konfirmasi Password"
      />
      <Button text="Registrasi" onClick={handleSubmit} />
    </div>
  );
};

export default RegistrationForm;
