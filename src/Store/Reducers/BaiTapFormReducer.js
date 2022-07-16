import {
  DELETE_SINHVIEN,
  SET_SELECTED,
  SUA_SINHVIEN,
  THEM_SINH_VIEN,
} from "../Types/BaiTapFormType";

const DEFAULT_STATE = {
  mangSinhVien: [
    {
      maSV: "1234",
      tenSV: "Vân Chi",
      email: "1234@gmail.com",
      soDienThoai: "1234",
    },
    {
      maSV: "1235",
      tenSV: "Mỹ Đỗ Toa",
      email: "1235@gmail.com",
      soDienThoai: "1235",
    },
    {
      maSV: "1236",
      tenSV: "Thanh Lân",
      email: "1236@gmail.com",
      soDienThoai: "1236",
    },
  ],
  selectedSV: null,
};

export const BaiTapFormReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case THEM_SINH_VIEN: {
      let mangSinhVienNew = [...state.mangSinhVien];
      for(let i = 0; i < mangSinhVienNew.length; i++) {
        if(payload.maSV === mangSinhVienNew[i].maSV){
            return alert("ID already exists!!!")
        }
      }
      mangSinhVienNew.push(payload);
      state.mangSinhVien = mangSinhVienNew;
      return { ...state };
    }

    case SET_SELECTED: {
      return { ...state, selectedSV: payload };
    }
    case DELETE_SINHVIEN: {
      state.mangSinhVien = state.mangSinhVien.filter(
        (sinhVien) => sinhVien.maSV !== payload
      );
      return { ...state };
    }

    case SUA_SINHVIEN: {
      // let data = [...state.mangSinhVien];
      // let index = data.findIndex(sinhVien => sinhVien.maSV === payload.maSV);
      // if(index !== -1) {
      //     data[index] = payload;
      // }
      // state.mangSinhVien = data;
      state.mangSinhVien = state.mangSinhVien.map((sinhVien) =>
        sinhVien.maSV === payload.maSV ? payload : sinhVien
      );
      state.selectedSV = null;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
