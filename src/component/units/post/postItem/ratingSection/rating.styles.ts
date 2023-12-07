import { Rate } from 'antd';
import styled from 'styled-components';

export const RatingWrapper = styled.section`
  margin-top: 10px;
`;

export const Rating = styled(Rate)`
  font-size: 20px;
  margin-right: 5px;
`;

export const RatingCount = styled.span`
  font-size: 14px;
  color: #888;
  font-weight: 500;
`;