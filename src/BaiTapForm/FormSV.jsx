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
  //thuộc tính cấp ngoài cùng thì khi setState sẽ chỉ set lại thằng mới và giữ lại những giá trị cũ
  // thuộc tính bên trong 1 cấp thì khi setState sẽ mất đi giá trị cũ mà chỉ set cái mới
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

  // chuyển đổi props thành state với điều kiện props tồn tại và mã SV của props !== state
  static getDerivedStateFromProps(nextProps, currentState) {
    if (
      nextProps.selectedSV &&
      currentState.values.id !== nextProps.selectedSV.id
    ) {
      currentState.values = nextProps.selectedSV;
      console.log(currentState.values, nextProps.selectedSV);
    }
    return currentState;
  }

  handleChange = (event) => {
    //  các thuộc tính kia của event nên check console.log(event)
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
    this.setState({
      errors: { ...this.state.errors, [name]: message },
      values: { ...this.state.values, [name]: value },
    });
  };

  handleSubMit = (event) => {
    event.preventDefault();
    // dựa vào true false của checkValidity mà xét validation và disabled cho nút thêmSV
    if (!event.target.checkValidity()) {
      return;
    }

    if (this.props.selectedSV) {
      this.props.dispatch(suaThongTinSV(this.state.values));
    } else {
      this.props.dispatch(themSinhVien(this.state.values));
    }
    this.setState(
      {
        values: DEFAULT_STATE,
      },
      () => {
        // dùng để bắt component render lại lần nữa
        this.forceUpdate();
      }
    );
  };

  render() {
    // nếu selected = null mà  bóc tách sẽ bị lỗi nên cho nó hoặc rỗng
    // const { maSV, tenSV, email, soDienThoai } = this.props.selectedSV || {};
    // ở trên chuyển props thành state ta đổi ở dưới đây
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
                    // đối với formRef thì current === event.target
                    // ? khi current có giá trị thì nó mới xét tới checkValidity, còn không thì không sử dụng tới
                    disabled={!this.formRef.current?.checkValidity()}
                    type="submit"
                    className="btn btn-success"
                  >
                    Thêm sinh viên
                  </button>
                  <button
                    type="reset"
                    className="btn btn-warning"
                    onClick={(e) => {
                      this.setState({values: DEFAULT_STATE} );
                    }}
                  >
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
