import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Col,
  Modal,
  Row,
  message
}
from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
import { getUserData } from "../../utils/userData";
import user from '../../models/user';
import { routerRedux } from "dva/router";

import { setAuthority } from "../../utils/authority";
import { unescapeIdentifier } from 'typescript';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const InputGroup = Input.Group;

const confirm = Modal.confirm;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleSetPassword, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      if (fieldsValue['new_password'] !== fieldsValue['new_password_check']) {
        message.error('new password dose not match, please input again.');
        return;
      }

      form.resetFields();
      handleSetPassword(fieldsValue);
    });
  };

  return (
    <Modal
      title="修改密码"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={e => handleModalVisible(false)}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="原密码">
        {form.getFieldDecorator('old_password', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input style={{ "text-transform": "uppercase" }}/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="新密码">
        {form.getFieldDecorator('new_password', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="确认新密码">
        {form.getFieldDecorator('new_password_check', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});

const ModifyPriceForm = Form.create()(props => {
  const { modalVisible, form, selectedRows, handleSetPriceFluctate, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleSetPriceFluctate(fieldsValue);
    });
  };

  return (
    <Modal
      title="修改基准价"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={e => handleModalVisible(false)}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="基准价">
        {form.getFieldDecorator('fluctuate_price', {
          initialValue: (selectedRows !== null && selectedRows !== undefined && selectedRows.length === 1) ? selectedRows[0].fluctuate_price : 0,
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input style={{ "text-transform": "uppercase" }}/>)}
      </FormItem>
    </Modal>
  );
});

@connect(({ rule, loading }) => ({
  rule,
  // loading: loading.models.rule,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    modalVisible: false,
    priceFormVisible: false,
    selectedRows: [],
    needUpdate: false,
    buttonDisable: true,
    priceChanged: false,
    priceRate: {},
    priceRateUnit: {},
    priceRateName: {},
    priceFluctuate: {},
    enableTraderAuto: true
  };

  gotoLoginPage = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/user/login'
    }))
  }

  componentWillMount() {
    var userData = getUserData();
    if (userData === undefined || userData === null) {
      setAuthority('guest');
      clearInterval(this.intervalId);
      this.gotoLoginPage();      
    }
  }

  componentDidMount() {    
    const { dispatch } = this.props;

    if (this.intervalId === undefined || this.intervalId === 0) {
      this.intervalId = setInterval(() => {
        var userData = getUserData();
        if (userData === undefined || userData === null) {
          setAuthority('guest');
          clearInterval(this.intervalId);
          this.gotoLoginPage();
          return;
        }
        // clearInterval(this.intervalId);
      }, 5000);
    }

    var userData = getUserData();
    if (userData === undefined || userData === null) {      
      return;
    }

    var param = {};
    var paramValue = {};
    paramValue[userData[0].bb_rate] = 0;    
    param[userData[0].bb_name] = paramValue;

    userData.forEach(element => {
      console.log('element:', element);
      
      this.state.priceRateName[element.bb_name] = element.bb_rate;
      this.state.priceRate[element.bb_name] = 0;
      if (typeof element.rate_unit === 'string') {
        this.state.priceRateUnit[element.bb_name] = parseFloat(element.rate_unit, 10);
      }
      else {
        this.state.priceRateUnit[element.bb_name] = element.rate_unit;
      }
      console.log('priceRateUnit:', this.state.priceRateUnit);
      
    });

    dispatch({
      type: 'rule/fetch',
      payload: param,
      callback: this.onFetchCallback
    });

    if (this.intervalId3 === 0 || this.intervalId3 === undefined) {
      this.intervalId3 = setInterval(() => {
        this.refreshAllInfo();
      }, 5000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    this.intervalId = 0;
    clearInterval(this.intervalId2);
    this.intervalId2 = 0;    
    clearInterval(this.intervalId3);    
    this.intervalId3 = 0;
  }

  onFetchCallback = (resp) => {
    if (resp === undefined || resp === null) {
      return;
    }

    if (resp.code !== 0 ) {
      this.gotoLoginPage();
    }    
  }

  refreshAllInfo = () => {
    for (var name in this.state.priceRateName) {
      var param = {};
      var paramValue = {};
      paramValue[this.state.priceRateName[name]] = this.state.priceRate[name];
      param[name] = paramValue;

      const {
        dispatch
      } = this.props;
      dispatch({
        type: 'rule/fetch',
        payload: param,
        callback: this.onFetchCallback
      });
    }
  }

  handleConfirmSetRate = () => {
    if (this.state.selectedRows !== undefined && this.state.selectedRows.length === 1) {
      var param = {},
          bb = {},
          payload = {};
      var name = this.state.selectedRows[0].name;
      param[this.state.priceRateName[name]] = this.state.priceRate[name];
      bb['rate'] = param;
      payload[name] = bb;

      this.state.priceRate[name] = 0;
      this.setState({
        priceChanged: false
      });
      
      const { dispatch } = this.props;
      
      dispatch({
        type: 'rule/settraderinfo',
        payload: payload,
        callback: this.handleSetTraderInfoCallback
      });
    }
  }

  showConfirm(plusPrice) {
    var titleMsg = '确定要应用调整后的价格?';
    confirm({
      title: titleMsg,
      onOk: this.handleConfirmSetRate,
      onCancel: this.handleConfirmEnableCancel,
    });
  }

  handleChangeCurrentPrice = plusPrice => {
    this.setState({
      priceChanged: true,
    });

    if (this.state.selectedRows !== undefined && this.state.selectedRows.length === 1) {
      var name = this.state.selectedRows[0].name;
      var rate_unit = this.state.priceRateUnit[name];

      if (plusPrice) {
        this.state.priceRate[name] += rate_unit;
      } else {
        this.state.priceRate[name] -= rate_unit;
      }

      var param = {};
      var paramValue = {};
      paramValue[this.state.priceRateName[name]] = this.state.priceRate[name];
      param[name] = paramValue;

      const { dispatch } = this.props;
      dispatch({
        type: 'rule/fetch',
        payload: param,
        callback: this.onFetchCallback
      });
    }
  }

  onChangePasswordCallback = (response) => {    
    if (response.code === 0) {
      message.success('Changing password succeeded.');
    }
    else {
      message.error(response.message);
    }
  }

  handleSetPassword = (fieldsValue) => {
    this.handleModalVisible(false);

    var userData = getUserData();
    if (userData === null || userData === undefined || userData.length === 0) {
      return;
    }
    
    var param = {
      id: userData[0].id,
      oldpassword: fieldsValue.old_password,
      newpassword: fieldsValue.new_password
    }
    
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/changepwd',
      payload: param,
      callback: this.onChangePasswordCallback
    });
  }

  handleModalVisible = (visible) => {
    this.setState({
      modalVisible: visible
    });
  }

  handlePriceFormVisible = (visible) => {
    this.setState({
      priceFormVisible: visible
    });
  }

  handleSetTraderInfoCallback = () => {
    if (this.intervalId2 === 0 || this.intervalId2 === undefined) {
      this.intervalId2 = setInterval(() => {
        if (this.state.selectedRows !== undefined && this.state.selectedRows.length === 1) {
          var name = this.state.selectedRows[0].name;
          var param = {};
          var paramValue = {};
          paramValue[this.state.priceRateName[name]] = this.state.priceRate[name];
          param[name] = paramValue;

          const {
            dispatch
          } = this.props;
          dispatch({
            type: 'rule/fetch',
            payload: param,
            callback: this.onFetchCallback
          });
        }
        clearInterval(this.intervalId2);
      }, 1000);    
    }
  }

  handleSetPriceFluctate = (newPrice) => {
    if (this.state.selectedRows !== undefined && this.state.selectedRows.length === 1) {
      this.state.priceFluctuate[this.state.selectedRows[0].name] = newPrice.fluctuate_price;
      
      var param = {},
          bb = {},
          payload = {};
      param['fluctuate_price'] = newPrice.fluctuate_price;
      bb['param'] = param;
      payload[this.state.selectedRows[0].name] = bb;

      const { dispatch } = this.props;

      dispatch({
        type: 'rule/settraderinfo',
        payload: payload,
        callback: this.handleSetTraderInfoCallback
      });
    }
    this.setState({
      priceFormVisible: false
    });
  }

  handleSelectRows = rows => {
    var btnDislable = this.state.buttonDisable;
    if (rows.length === 1) {
      btnDislable = false;
    } else {
      btnDislable = true;
    }

    this.setState({
      selectedRows: rows,
      buttonDisable: btnDislable
    });
  };

  handleConfirmEnableOK = () => {    
    if (this.state.selectedRows !== undefined && this.state.selectedRows.length === 1) {
      var param = {},
        bb = {},
        payload = {};
      param['trader_auto'] = this.state.enableTraderAuto;
      bb['param'] = param;
      payload[this.state.selectedRows[0].name] = bb;

      const {
        dispatch
      } = this.props;

      dispatch({
        type: 'rule/settraderinfo',
        payload: payload,
        callback: this.handleSetTraderInfoCallback
      });
    }
  };

  handleConfirmEnableCancel = () => {

  };

  showConfirmEnable(enable) {
    var titleMsg = '确定要启用自动操盘?';
    if (!enable) {
      titleMsg = '确定要禁用自动操盘?';
    }

    this.setState({
      enableTraderAuto: enable
    });

    confirm({
      title: titleMsg,
      onOk: this.handleConfirmEnableOK,
      onCancel: this.handleConfirmEnableCancel,
    });
  }

  onLogoutCallback = () => {
    this.gotoLoginPage();
  }

  handleLogout = () => {
    this.props.dispatch({
      type: 'rule/logout',
      callback: this.onLogoutCallback
    });
  }

  render() {    
    const { rule: { data }, loading } = this.props;
    const { selectedRows, modalVisible, priceFormVisible } = this.state;

    const columns = [
      {
        title: '名称',
        dataIndex: 'name'
      }, {
        title: '当前价格',
        dataIndex: 'current'
      }, {
        title: '目标价格',
        dataIndex: 'dynamic'
      }, {
        title: '基准价',
        dataIndex: 'fluctuate_price'
      }, {
        title: '自动操盘',
        dataIndex: 'trader_auto'
      }
    ];

    const parentMethods = {
      handleSetPassword: this.handleSetPassword,
      handleModalVisible: this.handleModalVisible,
    };

    const parentMethodsPriceForm = {
      handleSetPriceFluctate: this.handleSetPriceFluctate,
      handleModalVisible: this.handlePriceFormVisible,
    };

    data.list.forEach(element => {
      this.state.priceFluctuate[element.name] = element.fluctuate_price;
    });

    return (
      <div>
        <Card bordered={true} title="调整实时价格" >
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              rowKey="name"
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange} />
            <div className={styles.tableListOperator}>
              <Button disabled={this.state.buttonDisable} icon="plus" onClick={e => this.handleChangeCurrentPrice(true)}>调高价格</Button>
              <Button disabled={this.state.buttonDisable} icon="minus" onClick={e => this.handleChangeCurrentPrice(false)}>调低价格</Button>
              <Button disabled={!this.state.priceChanged} className={styles.applyButton} icon="check-circle" onClick={e => this.showConfirm(false)}>应用价格</Button>                            
            </div>
            <div className={styles.tableListOperator}>
              <Button disabled={this.state.buttonDisable} icon="safety" onClick={e => this.handlePriceFormVisible(true)}>修改基准价</Button>
              <Button disabled={this.state.buttonDisable} icon="check" onClick={e => this.showConfirmEnable(true)}>启动自动操盘</Button>
              <Button disabled={this.state.buttonDisable} icon="close" onClick={e => this.showConfirmEnable(false)}>禁用自动操盘</Button>
            </div>
          </div>
        </Card>
        <Card bordered={true}>
          <div className={styles.RowButtons} >
          <Row type="flex" justify="end"> 
            <Col >
              <Button onClick={e => this.handleLogout()}>退出</Button>
            </Col>
            <Col>
              <Button onClick={e => this.handleModalVisible(true)}>修改密码</Button>
            </Col>
          </Row>
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible}/>
        <ModifyPriceForm {...parentMethodsPriceForm} modalVisible={priceFormVisible} selectedRows={selectedRows} />        
      </div>
    );
  }
}
