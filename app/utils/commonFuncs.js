/**
 * 业务中一些会被重复使用到方法
 * Created by TY on 16/9/28.
 */
import React from 'react';
export function formDataTime(data) {
    return "123";
}

let changeStatus = (status) => {
    let ret = null;
    if(status == 2){
        ret = (<span><span className="sts-temporary">●</span>&nbsp;{'暂存'}</span>);
    }
    else if(status == 3){
        ret = (<span><span className="sts-pending">●</span>&nbsp;{'待审核'}</span>);
    }
    else if(status == 4){
        ret = (<span><span className="sts-failed">●</span>&nbsp;{'退回'}</span>);
    }
    else {
        ret = (<span><span className="sts-success">●</span>&nbsp;{'已审核'}</span>);
    }
    return ret;
}

/**
 * 根据状态数字转换成对应的中文
 * @param status
 * @returns {*}
 */
export function stateNumToWord(status) {
    let ret = changeStatus(status);
    return ret;
}

/**
 * server端过来的数据没有key 在参数列表中加上带有ID的key值
 * @param pArguments
 * @param dataId
 * @returns {Array}
 */
export function arrayToObjectState(pArguments,dataId){
    if(pArguments && pArguments.length > 0){
        let params = [];
        pArguments.map((item,i) => {
            let currKey = "12313213123";
            if(!item['key']){
                item['key'] = dataId+"_"+currKey;
            }
            params.push(item);
        });
        return params;
    }else {
        return [];
    }
}

/**
 * 修改参数时,把新修改的参数加入到旧的state中,如果该行参数已存在则修改,反之则新增
 * @param oldState
 * @param key
 * @param name
 * @param value
 * @returns {Array}
 */
export function getCurrParamState(oldState,key,name,value) {
    let isContain = false;
    let newState = [];
    oldState.map(item => {
        if(item.key && item.key == key){
            item[name] = value;
            isContain = true;
        }
        newState.push(item);
    });

    if(!isContain){
        let newItem = {
            key:key,
            name:value,
        };
        newState.push(newItem);
    }

    return newState;
}

export function getColnums() {
    let columns = [{
        title: '脚本名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '脚本类型',
        dataIndex: 'scriptType',
        key: 'scriptType',
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render:(text,record) => (
            <span>{changeStatus(record.status)}</span>
        ),
    }, {
        title: '最后修改人',
        dataIndex: 'lastUpdateUser',
        key: 'lastUpdateUser',
    }, {
        title: '最后修改时间',
        dataIndex: 'lastUpdateTime',
        key: 'lastUpdateTime',
        render:(text,record) => (
            <span>{}</span>
        ),
    }, {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark'
    }];

    return columns;
}

