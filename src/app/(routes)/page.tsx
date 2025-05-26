'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  // Smooth scroll function for navigation
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  /* istanbul ignore next */
  return (
    <main className="min-h-screen text-white bg-[#12181D] h-fit overflow-hidden relative">
      {/* Background ellipses with lower z-index */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Bottom right ellipse (Ellipse 9) */}
        <div className="absolute bottom-[-800px] right-[-400px]">
          <img
            src="/images/ellipse-9.svg"
            alt=""
            className="h-auto w-[1804px] max-w-none opacity-70"
          />
        </div>

        {/* Left ellipse (Ellipse 6) */}
        <div className="absolute -left-[400px] top-1/2 -translate-y-1/2">
          <img
            src="/images/ellipse-6.svg"
            alt=""
            className="h-auto w-[1375px] max-w-none opacity-70"
          />
        </div>

        {/* Right ellipse (Ellipse 7) */}
        <div className="absolute -right-[400px] top-1/2 -translate-y-1/2">
          <img
            src="/images/ellipse-7.svg"
            alt=""
            className="h-auto w-[1134px] max-w-none opacity-70"
          />
        </div>
      </div>

      {/* Content container with higher z-index */}
      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-6 py-20 text-center min-h-screen">
          <motion.h1
            className="mb-4 text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl text-neutral-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Revolusi Manajemen Dokumen <br className="hidden md:inline" />{' '}
            dengan <span className="text-orange-500">QR Code</span>
          </motion.h1>
          <motion.p
            className="mx-auto max-w-2xl text-center text-base leading-relaxed md:text-lg text-neutral-300 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Kami menyediakan cara yang aman dan transparan untuk melakukan
            transfer kepemilikan dokumen menggunakan QR code. Setiap dokumen
            dienkripsi secara unik, memastikan kerahasiaan penuh selama proses
            transfer.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/upload-document"
              className="flex-1 rounded-xl bg-orange-500 px-6 py-3 text-center font-medium text-white transition-all hover:bg-orange-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-blue-900 shadow-md"
            >
              Mulai Sekarang
            </Link>
            <motion.button
              onClick={() => scrollToSection('learn-more')}
              className="flex-1 rounded-xl bg-white/10 backdrop-blur-sm px-6 py-3 text-center font-medium text-white border border-white/20 transition-all hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 15px rgba(255, 126, 50, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              Pelajari Lebih Lanjut
            </motion.button>
          </motion.div>
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer hidden md:block"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            onClick={() => scrollToSection('learn-more')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-orange-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </section>

        {/* QR Code Section */}
        <section
          id="learn-more"
          className="px-6 py-24 bg-gradient-to-b from-[#12181D]/80 to-[#12181D] backdrop-blur-sm"
        >
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-orange-500/20 text-orange-400">
                Teknologi QR Terenkripsi
              </span>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl text-neutral-50">
                Keamanan Dokumen{' '}
                <span className="text-orange-400">Tanpa Kompromi</span>
              </h2>
              <p className="mb-0 mx-auto max-w-2xl text-center text-base md:text-lg text-neutral-300">
                Setiap dokumen dilengkapi QR Code unik dengan enkripsi untuk
                keamanan maksimal.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* First QR Code */}
              <div className="overflow-hidden rounded-xl bg-white/10 p-8 backdrop-blur-sm border border-white/10 shadow-xl transition-transform hover:scale-105">
                <div className="flex flex-col items-center gap-8 md:flex-row">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/qr-sample-2.png"
                      alt="QR Code for document creation"
                      width={150}
                      height={150}
                      className="h-[150px] w-[150px] rounded-lg bg-white p-3 shadow-lg transform transition-all"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="mb-3 text-xl font-semibold text-orange-400">
                      Double QR Security
                    </h3>
                    <p className="text-base leading-relaxed text-neutral-200">
                      Sistem akan membuat 2 QR Code unik untuk dokumen Anda
                      <br />
                      (1 untuk dipertukarkan sesuai kebutuhan)
                      <br />
                      memastikan keamanan dan autentikasi dokumen.
                    </p>
                  </div>
                </div>
              </div>

              {/* Second QR Code */}
              <div className="overflow-hidden rounded-xl bg-white/10 p-8 backdrop-blur-sm border border-white/10 shadow-xl transition-transform hover:scale-105">
                <div className="flex flex-col items-center gap-8 md:flex-row">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/qr-sample-1.png"
                      alt="QR Code for document download"
                      width={150}
                      height={150}
                      className="h-[150px] w-[150px] rounded-lg bg-white p-3 shadow-lg transform transition-all"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="mb-3 text-xl font-semibold text-orange-400">
                      Secure Storage
                    </h3>
                    <p className="text-base leading-relaxed text-neutral-200">
                      QR Code harus didownload dan disimpan dengan aman
                      <br />
                      untuk memastikan kerahasiaan dan integritas
                      <br />
                      dokumen Anda tetap terjaga.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transfer Document Ownership Section */}
        <section
          id="transfer"
          className="px-6 py-24 bg-gradient-to-b from-[#12181D] via-[#1a2433] to-[#12181D]"
        >
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-orange-500/20 text-orange-400">
                Transfer Document Ownership
              </span>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl text-neutral-50">
                Amankan Perpindahan Dokumen{' '}
                <span className="text-orange-400">dengan Verifikasi OTP</span>
              </h2>
              <p className="mb-0 mx-auto max-w-2xl text-center text-base md:text-lg text-neutral-300">
                Proses transfer kepemilikan dokumen yang aman, transparan, dan
                terverifikasi untuk ketenangan pikiran Anda
              </p>
            </motion.div>

            <div className="grid gap-y-16 md:gap-y-24">
              {/* Step 1 */}
              <motion.div
                className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold mr-3">
                      1
                    </div>
                    <h3 className="text-2xl font-semibold text-neutral-50">
                      Scan QR Utama dan klik Transfer Document
                    </h3>
                  </div>
                  <p className="text-neutral-300 text-base mb-6">
                    Mulai proses transfer dengan memindai QR code dokumen Anda.
                    Setelah berhasil dipindai, klik tombol Transfer Document
                    untuk melanjutkan.
                  </p>
                </div>
                <motion.div
                  className="md:w-1/2"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Image
                    src="/images/transfer-document-button.svg"
                    alt="Transfer Document Button"
                    width={400}
                    height={250}
                    className="w-full h-auto rounded-md shadow-lg"
                    quality={100}
                    priority
                  />
                </motion.div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="md:w-1/2 order-2 md:order-1"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Image
                    src="/images/transfer-form.svg"
                    alt="Transfer Form Interface"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg shadow-lg"
                    quality={100}
                  />
                </motion.div>
                <div className="md:w-1/2 order-1 md:order-2">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold mr-3">
                      2
                    </div>
                    <h3 className="text-2xl font-semibold text-neutral-50">
                      Masukkan Email Penerima
                    </h3>
                  </div>
                  <p className="text-neutral-300 text-base mb-6">
                    Isikan alamat email penerima pada form yang tersedia.
                    Pastikan email yang dimasukkan benar untuk menghindari
                    kesalahan transfer.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold mr-3">
                      3
                    </div>
                    <h3 className="text-2xl font-semibold text-neutral-50">
                      Sistem Mengirimkan Kode OTP ke Pemilik Saat Ini
                    </h3>
                  </div>
                  <p className="text-neutral-300 text-base mb-6">
                    Pemilik saat ini harus memberikan kode OTP yang diterima ke
                    penerima untuk melanjutkan proses transfer. Kode ini
                    memastikan bahwa hanya pemilik yang sah yang dapat melakukan
                    transfer dokumen.
                  </p>
                </div>
                <motion.div
                  className="md:w-1/2"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Image
                    src="/images/show-otp.svg"
                    alt="OTP Verification"
                    width={400}
                    height={250}
                    className="w-full h-auto rounded-md shadow-lg"
                    quality={100}
                  />
                </motion.div>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div
                  className="md:w-1/2 order-2 md:order-1"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Image
                    src="/images/transfer-request.svg"
                    alt="Transfer Request Complete"
                    width={400}
                    height={250}
                    className="w-full h-auto rounded-lg shadow-lg"
                    quality={100}
                  />
                </motion.div>
                <div className="md:w-1/2 order-1 md:order-2">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold mr-3">
                      4
                    </div>
                    <h3 className="text-2xl font-semibold text-neutral-50">
                      Penerima Dokumen Memasukkan Kode OTP
                    </h3>
                  </div>
                  <p className="text-neutral-300 text-base mb-6">
                    Penerima dokumen akan menerima email dengan instruksi untuk
                    memasukkan kode OTP yang diberikan oleh pemilik saat ini.
                    Penerima harus memasukkan kode ini untuk menyelesaikan
                    proses transfer.
                  </p>
                  <p className="text-sm text-neutral-400 mt-4 p-3 border border-orange-400/20 rounded-md bg-orange-500/5">
                    <strong className="text-orange-400">Penting:</strong>{' '}
                    Setelah transfer berhasil, QR Code lama menjadi tidak valid
                    dan hanya QR Code baru yang dapat digunakan untuk akses dan
                    verifikasi dokumen.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Scan QR Code Section */}
        <section
          id="verification"
          className="px-6 py-24 bg-gradient-to-b from-[#12181D]/70 to-[#12181D]/90"
        >
          <div className="mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-orange-500/20 text-orange-400">
                Verifikasi Kepemilikan
              </span>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl text-neutral-50">
                Pantau Kepemilikan{' '}
                <span className="text-orange-400">Secara Real-time</span>
              </h2>
              <p className="mb-0 mx-auto max-w-2xl text-center text-base md:text-lg text-neutral-300">
                Akses informasi status dokumen secara instan dan dapatkan
                riwayat transfer lengkap dengan sekali pindai
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-10 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-8 h-8 text-orange-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-50 mb-3">
                  Pindai QR Code
                </h3>
                <p className="text-center text-neutral-300 max-w-xs">
                  Pindai QR Code untuk melihat status dokumen.
                </p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-12 h-12 text-neutral-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-8 h-8 text-orange-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-50 mb-3">
                  Tampilkan Informasi
                </h3>
                <p className="text-center text-neutral-300 max-w-xs">
                  Sistem akan menampilkan informasi kepemilikan dan riwayat
                  transfer.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
