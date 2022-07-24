import React, { Component } from "react";
import { connect } from "react-redux";
import {
  xoaSinhVien,
  hienThongTinSua,
} from "../Store/Actions/BaiTapFormAction";

class TableSV extends Component {
  state = {
    keyword: "",
  };

  renderSinhVien = () => {
    let data = this.props.mangSinhVien.filter((sinhVien) => {
      return (
        sinhVien.tenSV
          .toLowerCase()
          .trim()
          .indexOf(this.state.keyword.toLowerCase().trim()) !== -1
      );
    });

    return data.map((sinhVien, index) => {
      return (
        <tr key={index}>
          <td>{sinhVien.maSV}</td>
          <td>{sinhVien.tenSV}</td>
          <td>{sinhVien.soDienThoai}</td>
          <td>{sinhVien.email}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => this.props.dispatch(hienThongTinSua(sinhVien))}
            >
              Sửa
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.props.dispatch(xoaSinhVien(sinhVien.id))}
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };

  onChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-light p-0">
          <div
            className="collapse navbar-collapse"
            style={{ justifyContent: "end" }}
            id="collapsibleNavId"
          >
            <form className="form-inline my-2 my-lg-0">
              <input
                onChange={this.onChange}
                className="form-control mb-2"
                type="text"
                name="keyword"
                placeholder="Search"
              />
            </form>
          </div>
        </nav>

        <table className="table">
          <thead>
            <tr className="bg-dark text-light">
              <th>Mã SV</th>
              <th>Tên SV</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>{this.renderSinhVien()}</tbody>
        </table>
      </div>
    );
  }
}
export default connect((state) => ({ ...state.BaiTapFormReducer }))(TableSV);
