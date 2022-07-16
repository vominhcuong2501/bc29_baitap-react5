import React, { Component } from 'react'
import FormSV from './FormSV'
import TableSV from './TableSV'

export default class BaiTapForm extends Component {
  render() {
    return (
      <div className='container'>
        <h3 className='text-center text-danger'>Bài tập quản lý sinh viên</h3>
        <FormSV />
        <TableSV />
      </div>
    )
  }
}
