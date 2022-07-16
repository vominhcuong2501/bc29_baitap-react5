import { DELETE_SINHVIEN, SET_SELECTED, SUA_SINHVIEN, THEM_SINH_VIEN } from "../Types/BaiTapFormType"

const themSinhVien = (values) => {
    return {
        type: THEM_SINH_VIEN,
        payload: values,
      }
}
const suaThongTinSV = (values) => {
    return {
        type: SUA_SINHVIEN,
        payload: values,
      }
}
const xoaSinhVien = (maSV) => {
    return {
        type: DELETE_SINHVIEN,
        payload: maSV
      }
}
const hienThongTinSua = (sinhVien) => {
    return {
        type: SET_SELECTED,
        payload: sinhVien
    }
}
export {themSinhVien, xoaSinhVien, hienThongTinSua,suaThongTinSV}