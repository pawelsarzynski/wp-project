import styled, { keyframes, css } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url(${require("../assets/background.jpg")});
  background-position: "center";
  background-size: "cover";
  background-repeat: "no-repeat";
`;

const boom = keyframes`
  0% {
    border: 1px solid #ccc;
    transform: rotate(0deg);
  }
  50% {
    border: 7px solid red;
    transform: rotate(30deg);
  }
  100% {
    border: 1px solid #ccc;
    transform: rotate(0deg);
  }
`;

interface OpponentSectionProps {
  readonly isAttacking?: boolean;
}

const OpponentSection = styled.div<OpponentSectionProps>`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 30vh;
  padding: 30px;

  div {
    ${({ isAttacking }) =>
      isAttacking &&
      css`
        animation: ${boom} 0.6s ease;
      `}
  }

  button {
    width: 88px;
    height: 44px;
    border-radius: 8px;
    background-color: #bd7cd8;
    outline: none;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const TeamSection = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  width: 100vw;
  height: 70vh;
  padding: 30px;
`;

const attack = (index: number | undefined) => {
  console.log(index);
  return keyframes`
  0% {
    transform: translateX(0) translateY(0);
  }

  50% {
    transform: translateX(${
      index === 0
        ? "400%"
        : index === 1
        ? "200%"
        : index === 2
        ? "0%"
        : index === 3
        ? "-200%"
        : "-400%"
    }) translateY(-180%);
  }

  100% {
    transform: translateX(0) translateY(0);
  }
`;
};

interface PokemonProps {
  readonly isOpponent?: boolean;
  readonly isAttacking?: boolean;
  readonly index?: number;
  readonly isDead?: boolean;
}

const Pokemon = styled.div<PokemonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 160px;
  height: 172px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #ddd;
  cursor: pointer;
  transition: transform 0.3s ease;
  ${({ isDead }) =>
    isDead &&
    css`
      cursor: not-allowed;
      opacity: 0.4;
    `}

  ${({ isAttacking, index }) =>
    isAttacking &&
    css`
      animation: ${attack(index)} 0.6s ease;
    `}

  &:hover {
    transform: ${({ isOpponent }) => !isOpponent && `scale(1.2)`};
  }

  span:first-of-type {
    font-weight: bold;
  }
`;

export { Container, OpponentSection, TeamSection, Pokemon };
