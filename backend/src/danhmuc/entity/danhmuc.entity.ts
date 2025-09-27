import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum LoaiDanhMuc {
  NAM = 'Nam',
  NU = 'Nữ',
  PHUKIEN = 'Phụ kiện'
}
@Entity('danhmuc')
export class Danhmuc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  TenDanhMuc: string;

  @Column({ default: true })
  TrangThai: boolean;

  @Column({})
  Loai: LoaiDanhMuc;
}
