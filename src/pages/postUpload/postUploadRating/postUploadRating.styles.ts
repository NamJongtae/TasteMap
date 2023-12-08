import { Rate } from 'antd';
import styled from 'styled-components';

export const RatingSection = styled.section`
  margin-bottom: 20px;
`;

export const RatingTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 15px;
`;

export const RatingWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 auto 20px auto;
  border: none;
`;
export const Rating = styled(Rate)`
  font-size: 24px;
`;

export const RatingTag = styled.span``;
export const RatingCount = styled.span`
  font-size: 14px;
  color: #555;
  font-weight: bold;
`;