import styled from "styled-components";
// import { COLORS, ITheme } from 'src/styles';

export const Styled = styled.div`
  margin-bottom: 15px;
  .input-wrapper {
    position: relative;
    flex: 1;
    > p {
      margin-top: 10px;
    }
  }
  .align-right {
    text-align: right;
  }
  .input-container {
    position: relative;
    height: 40px;
    display: flex;
    flex: 1;
  }
  .sub-title {
    width: 60px;
  }
  > p {
    margin-top: 10px;
  }
  p.error {
  }
  p.warning {
  }
  .textarea-container {
    min-height: 76px;
    position: relative;
  }
  .input-container > input,
  .textarea-container > textarea {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    padding: 0 10px;
    :focus {
    }
  }
  .textarea-container > textarea {
    padding: 10px;
    resize: none;
  }
  .input-container > input:read-only {
  }
  .input-wrap-suffix {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
    flex: 1;
    border-radius: 8px;
    padding: 0 10px;
  }
  .input-wrap-suffix > input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    padding: 0 10px;
  }
  .input-wrap-suffix > p {
    margin-left: 3px;
  }
  .input-container .sub-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .input-amount {
    > input {
      padding-right: 40px;
    }
    .sub-icon {
      right: 10px;
    }
  }

  .align-right {
    > input {
      text-align: right;
      padding-right: 0px;
    }
    .sub-icon {
      right: 10px;
    }
  }

  .input-address {
    > input {
      padding-right: 70px;
    }
    .sub-icon {
      :nth-child(2) {
        right: 40px;
      }
      :last-child {
        right: 10px;
      }
    }
  }
  .wrapper {
    margin-top: 15px;
  }
  .wrap-content {
    height: 40px;
    width: 230px;
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    border-radius: 8px;
    padding: 0 10px;
  }
  .wrap-content > p {
    padding-right: 5px;
  }
  .suffix {
    padding-left: 5px;
    display: contents;
  }

  .input-password {
    > input {
      padding-right: 40px;
    }
    > .sub-icon:last-child {
      right: 10px;
    }
  }
`;
