import React, { Component } from 'react';
import { Row, Col, Divider, DatePicker, Icon } from 'antd';
import moment from 'moment';

import { Label, UploadText, Error } from '../ProfileComponents.style';

class DateRanges extends Component {
  state = {};

  render() {
    const {
      disabledStartDate,
      disabledEndDate,
      onEndChange,
      onStartChange,
      handleAddMoreRanges,
      deleteDate,
      availableDates,
      error,
      readOnly,
    } = this.props;

    return (
      <Row gutter={25} type="flex" style={{ padding: '0.5rem 0 1rem 0' }}>
        <Col xs={24}>
          <Row gutter={25} type="flex">
            <Col xs={24} md={20} lg={20}>
              {availableDates.map((item, index) => (
                <div key={item._id} style={{ marginBottom: '25px' }}>
                  {index !== 0 && (
                    <Divider
                      style={{
                        marginTop: '25px',
                        background: 'none',
                      }}
                    />
                  )}
                  <Col xs={24} sm={2}>
                    <Label light>From</Label>
                  </Col>

                  <Col xs={24} sm={9}>
                    <DatePicker
                      disabledDate={value => disabledStartDate(index, value)}
                      format="YYYY-MM-DD"
                      value={item.startDate ? moment(item.startDate) : null}
                      placeholder="Start"
                      onChange={value => onStartChange(index, value)}
                      disabled={readOnly}
                    />
                  </Col>
                  <Col xs={24} sm={2}>
                    <Label light>Until</Label>
                  </Col>
                  <Col xs={24} sm={9}>
                    <DatePicker
                      disabledDate={value => disabledEndDate(index, value)}
                      format="YYYY-MM-DD"
                      value={item.endDate ? moment(item.endDate) : null}
                      placeholder="End"
                      onChange={value => onEndChange(index, value)}
                      open={item.endOpen}
                      disabled={readOnly}
                    />
                  </Col>
                  {!readOnly && (
                    <Col
                      xs={24}
                      sm={2}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '32px',
                      }}
                    >
                      <Icon
                        type="close"
                        style={{ color: '#0ac7e7' }}
                        onClick={() => deleteDate(index)}
                      />
                    </Col>
                  )}
                </div>
              ))}
            </Col>
          </Row>
          {!readOnly && (
            <>
              <UploadText
                style={{
                  marginTop: '20px',
                  display: 'block',
                }}
                onClick={handleAddMoreRanges}
              >
                {availableDates.length > 0 ? '+ Add more' : '+ Add date'}
              </UploadText>
              <Error>{error}</Error>
            </>
          )}
        </Col>
      </Row>
    );
  }
}

export default DateRanges;
