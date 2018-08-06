import { stringify } from 'qs';
import request from '../utils/request';
import { dispatch } from 'rxjs/internal/observable/range';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  var response = await request(`/api/dyntraderinfo`, {
      method: 'POST',
      body: params
    }
  );
  
  console.log('queryRule res:', response);
  
  return response;
}

export async function changePwd(params) {
  var response = await request('/api/chgpassword', {
    method: 'POST',
    body: params,
  });
  
  console.log('changepwd res:', response);
  
  return response;
}

export async function setTraderInfo(params) {
  var response = await request('/api/settraderinfo', {
    method: 'POST',
    body: params
  });

  console.log('setTrader res:', response);
  
  return response;
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {  
  var response = await request('/api/login', {
    method: 'POST',
    body: params,
  });

  console.log("login res:", response);
  
  return response;
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
