import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum LoaiDanhMuc {
    NAM = 'Nam',
    NU = 'Nữ',
    PHUKIEN = 'Phụ kiện'
}
@Entity('sukienuudai')
export class SuKienUuDai {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    TenSK: string
    @Column({ type: 'date' })
    NgayPH: string
    @Column({ type : 'date' })
    NgayKT: string
    @Column({ default: true })
    TrangThai: boolean;
    @Column({ type: 'int' })
    PhanTramGiam: number;
}
