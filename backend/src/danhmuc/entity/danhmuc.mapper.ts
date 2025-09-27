import { Danhmuc } from './danhmuc.entity';
import { DanhMucDto } from '../dto/danhmuc.dto';

export class DanhmucMapper {
  static toEntity(dto: DanhMucDto): Danhmuc {
    const entity = new Danhmuc();
    entity.TenDanhMuc = dto.TenDanhMuc;
    entity.TrangThai = dto.TrangThai;
    entity.Loai = dto.Loai;
    return entity;
  }

  static toDto(entity: Danhmuc): DanhMucDto {
    return {
      TenDanhMuc: entity.TenDanhMuc,
      TrangThai: entity.TrangThai,
      Loai: entity.Loai,
    };
  }

  static toEntityList(prismaList: any[]): Danhmuc[] {
    return prismaList.map(this.toEntity);
  }
}
