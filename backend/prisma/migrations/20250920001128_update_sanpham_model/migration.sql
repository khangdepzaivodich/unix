/*
  Warnings:

  - Added the required column `MaDM` to the `SANPHAM` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."SANPHAM" ADD COLUMN     "MaDM" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."v_chitietsanpham" (
    "MaSP" TEXT NOT NULL,
    "TenSP" TEXT NOT NULL,
    "MoTa" TEXT,
    "MaCTSP" TEXT NOT NULL,
    "KichCo" "public"."KichCo" NOT NULL,
    "MauSac" "public"."MauSac" NOT NULL,
    "SoLuong" INTEGER NOT NULL,
    "TrangThai" "public"."TrangThai" NOT NULL,
    "ngay_tao_sanpham" TIMESTAMP(3) NOT NULL,
    "ngay_capnhat" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."v_nhaphang" (
    "MaNH" TEXT NOT NULL,
    "NgayNhap" TIMESTAMP(3) NOT NULL,
    "MaNCC" TEXT NOT NULL,
    "TenNCC" TEXT NOT NULL,
    "MaCTSP" TEXT NOT NULL,
    "TenSP" TEXT NOT NULL,
    "SoLuong" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."v_donhang_tinhtrang" (
    "MaDH" TEXT NOT NULL,
    "MaKH" TEXT NOT NULL,
    "TenKH" TEXT NOT NULL,
    "ngay_dat" TIMESTAMP(3) NOT NULL,
    "TrangThai" "public"."TrangThaiDonHang" NOT NULL,
    "ngay_capnhat" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."v_chitietdonhang" (
    "MaDH" TEXT NOT NULL,
    "TenKH" TEXT NOT NULL,
    "TenSP" TEXT NOT NULL,
    "KichCo" "public"."KichCo" NOT NULL,
    "MauSac" "public"."MauSac" NOT NULL,
    "SoLuong" INTEGER NOT NULL,
    "ngay_dat" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."v_voucher_donhang" (
    "MaDH" TEXT NOT NULL,
    "TenKH" TEXT NOT NULL,
    "MaVoucher" TEXT,
    "TenVoucher" TEXT,
    "SoTien" INTEGER,
    "FreeShip" BOOLEAN,
    "ngay_dat" TIMESTAMP(3) NOT NULL
);

-- AddForeignKey
ALTER TABLE "public"."SANPHAM" ADD CONSTRAINT "SANPHAM_MaDM_fkey" FOREIGN KEY ("MaDM") REFERENCES "public"."DANHMUC"("MaDM") ON DELETE RESTRICT ON UPDATE CASCADE;
