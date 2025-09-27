
import { Body, Controller, Get, Post, Put, Delete, Param, Query, Patch } from '@nestjs/common';
import { DanhmucService } from './danhmuc.service';
import { DanhMucDto } from './dto/danhmuc.dto';
import { ResponseMessage } from 'src/decorators/response.decorator';
import { LoaiDanhMuc } from './entity/danhmuc.entity';

@Controller('danhmuc')
export class DanhmucController {
    constructor(private readonly danhmucService: DanhmucService) {}

    // Xem thông tin danh mục (tất cả hoặc theo id)
    @Get()
    getAllDanhMuc() {
        return this.danhmucService.getAllDanhMuc();
    }

    // Thêm mới danh mục sản phẩm
    @Post()
    @ResponseMessage('Thêm danh mục thành công')
    addDanhMuc(@Body() data: DanhMucDto) {
        return this.danhmucService.addDanhMuc(data);
    }

    // Cập nhật thông tin danh mục
    @Put(':id')
    updateDanhMuc(@Param('id') id: number, @Body() data: DanhMucDto) {
        return this.danhmucService.updateDanhMuc(id, data);
    }

    // Thay đổi trạng thái danh mục
    @Put(':id/trangthai')
    changeTrangThai(@Param('id') id: number, @Body('trangThai') trangThai: boolean) {
        return this.danhmucService.changeTrangThai(id, trangThai);
    }

    // Thay đổi loại danh mục
    @Put(':id/loai')
    changeLoai(@Param('id') id: number, @Body('loai') loai: LoaiDanhMuc) {
        return this.danhmucService.changeLoai(id, loai);
    }

    // Xuất danh mục sản phẩm (ví dụ: export ra file, ở đây trả về danh sách)
    @Get('export')
    exportDanhMuc() {
        return this.danhmucService.exportDanhMuc();
    }
}
