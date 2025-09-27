import { IsNotEmpty, IsString, IsInt, IsBoolean, IsEnum } from "class-validator";

export class SuKienUuDaiDto {
    @IsString({ message: 'Tên sự kiện ưu đãi phải là chuỗi' })
    @IsNotEmpty({ message: 'Tên sự kiện ưu đãi không được để trống' })
    TenSK: string;
    // Ngày bắt đầu sự kiện
    @IsString({ message: 'Ngày bắt đầu phải là chuỗi' })
    @IsNotEmpty({ message: 'Ngày bắt đầu không được để trống' })
    NgayPH: string;
    // Ngày kết thúc sự kiện
    @IsString({ message: 'Ngày kết thúc phải là chuỗi' })
    @IsNotEmpty({ message: 'Ngày kết thúc không được để trống' })
    NgayKT: string;

    // Trạng thái mặc định là true (active)
    @IsBoolean({ message: 'Trạng thái phải là boolean' })
    @IsNotEmpty({ message: 'Trạng thái không được để trống' })
    TrangThai: boolean;
    //phan trăm giảm giá
    @IsInt({ message: 'Phần trăm giảm giá phải là số nguyên' })
    @IsNotEmpty({ message: 'Phần trăm giảm giá không được để trống' })
    PhanTramGiam: number;    
}