import { SuKienUuDaiDto } from "../dto/sukienuudai.dto";
import { SuKienUuDai } from "./sukienuudai.entity";
export class SuKienUuDaiMapper{
    static toEntity(dto: SuKienUuDaiDto): SuKienUuDai{
        const entity = new SuKienUuDai();
        entity.TenSK = dto.TenSK;
        entity.NgayPH = dto.NgayPH;
        entity.NgayKT = dto.NgayKT;
        entity.TrangThai = dto.TrangThai;
        entity.PhanTramGiam = dto.PhanTramGiam
        return entity;
    }

    static toDto(entity: SuKienUuDai): SuKienUuDaiDto{
        return{
            TenSK: entity.TenSK,
            NgayPH: entity.NgayPH,
            NgayKT: entity.NgayKT,
            TrangThai: entity.TrangThai,
            PhanTramGiam: entity.PhanTramGiam
        }
    }

    static toEntityList(prismaList: any[]):SuKienUuDai[]{
        return prismaList.map(this.toEntity);
    }
}
