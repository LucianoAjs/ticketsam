import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;

  h3 {
    font: 400 clamp(1em, 1em + 1vw, 2em) bold;
  }

  img {
    width: clamp(10em, 10em + 10vw, 20em);
  }

  button {
    font: 400 clamp(0.8em, 0.8em + 0.8vw, 1.8em) bold !important;
    padding: clamp(0.3em, 0.3em + 0.3vw, 0.6em)
      clamp(0.8em, 0.8em + 0.8vw, 1.5em) !important;
  }

  @media print {
    *:not(#qrcode) {
      visibility: hidden;
    }
    #qrcode {
      display: flex;
      justify-content: center;
    }
  }
`;
