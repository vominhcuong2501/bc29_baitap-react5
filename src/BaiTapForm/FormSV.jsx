import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { themSinhVien, suaThongTinSV } from "../Store/Actions/BaiTapFormAction";
let DEFAULT_STATE = {
  maSV: "",
  tenSV: "",
  email: "",
  soDienThoai: "",
};

class FormSV extends Component {
  state = {
    values: DEFAULT_STATE,
    errors: {
      maSV: "",
      tenSV: "",
      email: "",
      soDienThoai: "",
    },
  };

  // tạo để gán vào thẻ form lấy được sự kiện event.target
  formRef = createRef();

  static getDerivedStateFromProps(nextProps, currentState) {
    if (
      nextProps.selectedSV &&
      currentState.values.maSV !== nextProps.selectedSV.maSV
    ) {
      currentState.values = nextProps.selectedSV;
    }
    return currentState;
  }

  handleChange = (event) => {
    const {
      name,
      value,
      title,
      minLength,
      maxLength,
      validity: { valueMissing, patternMismatch, tooLong, tooShort },
    } = event.target;
    let message = "";
    if (patternMismatch) {
      message = `${title} is invalid patttern`;
    }
    if (tooShort || tooLong) {
      message = `${title} is from ${minLength} - ${maxLength} characters`;
    }
    if (valueMissing) {
      message = `${title} is required`;
    }
    this.setState(
      {
        errors: { ...this.state.errors, [name]: message },
        values: { ...this.state.values, [name]: value },
      }
    );
  };

  handleSubMit = (event) => {
    event.preventDefault();
    // dựa vào true false của checkValidity mà xét disabled cho nút thêmSV
    if (!event.target.checkValidity()) {
      return;
    }

    if (this.props.selectedSV) {
      this.props.dispatch(suaThongTinSV(this.state.values));
    } else {
      this.props.dispatch(themSinhVien(this.state.values));
    }
    this.setState({
      values: DEFAULT_STATE,
    });
  };

  render() {
    const { maSV, tenSV, email, soDienThoai } = this.state.values || {};
    return (
      <div className="container p-0 my-5">
        <div className="card text-left">
          <div className="card-header bg-dark text-light">
            Thông tin sinh viên
          </div>
          <div className="card-body">
            <form ref={this.formRef} noValidate onSubmit={this.handleSubMit}>
              <div className="row">
                <div className="form-group col-6">
                  <span>Mã SV</span>
                  <input
                    onChange={this.handleChange}
                    name="maSV"
                    title="ID"
                    className="form-control"
                    required
                    value={maSV}
                  />
                  {this.state.errors.maSV && (
                    <span className="text-danger">
                      {this.state.errors.maSV}
                    </span>
                  )}
                </div>
                <div className="form-group col-6">
                  <span>Tên SV</span>
                  <input
                    onChange={this.handleChange}
                    className="form-control"
                    name="tenSV"
                    title="Name"
                    minLength={6}
                    maxLength={20}
                    required
                    value={tenSV}
                    pattern='^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'
                  />
                  {this.state.errors.tenSV && (
                    <span className="text-danger">
                      {this.state.errors.tenSV}
                    </span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <span>Email</span>
                  <input
                    onChange={this.handleChange}
                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                    className="form-control"
                    name="email"
                    type="email"
                    title="Email"
                    required
                    value={email}
                  />
                  {this.state.errors.email && (
                    <span className="text-danger">
                      {this.state.errors.email}
                    </span>
                  )}
                </div>
                <div className="form-group col-6">
                  <span>Số điện thoại</span>
                  <input
                    onChange={this.handleChange}
                    className="form-control"
                    name="soDienThoai"
                    pattern="^[0-9]+$"
                    title="Phonenumber"
                    required
                    value={soDienThoai}
                  />
                  {this.state.errors.soDienThoai && (
                    <span className="text-danger">
                      {this.state.errors.soDienThoai}
                    </span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="text-right col-md-12">
                  <button
                    disabled={!this.formRef.current?.checkValidity()}
                    type="submit"
                    className="btn btn-success"
                  >
                    Thêm sinh viên
                  </button>
                  <button type="reset" className="btn btn-warning">
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default connect((state) => ({ ...state.BaiTapFormReducer }))(FormSV);
