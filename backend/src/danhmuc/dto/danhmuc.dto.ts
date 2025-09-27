import { IsNotEmpty, IsString, IsInt, IsBoolean, IsEnum } from "class-validator";
import { LoaiDanhMuc } from "../entity/danhmuc.entity";

export class DanhMucDto {
    @IsString({ message: 'Tên danh mục phải là chuỗi' })
    @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
    TenDanhMuc: string;

    //trạng thái mặc định là true (active)
    @IsBoolean({ message: 'Trạng thái phải là boolean' })
    @IsNotEmpty({ message: 'Trạng thái không được để trống' })
    TrangThai: boolean;


    @IsEnum(LoaiDanhMuc, { message: 'Loại danh mục không hợp lệ' })
    Loai: LoaiDanhMuc;
}