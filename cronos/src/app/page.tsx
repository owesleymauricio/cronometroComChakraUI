'use client'
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { useState } from "react";


export default function Home() {

  const [time, setTime] = useState<any>({ hours: 0, minutes: 0, seconds: 0 });
  const [running, setRunning] = useState<any>(false);
  const [timer, setTimer] = useState<any>(null); // Estado para armazenar o ID do intervalo

  const startTimer = () => {
    setRunning(true);
    setTimer(setInterval(() => {
      setTime((prevTime: any) => {
        const newTime = { ...prevTime };
        newTime.seconds++;
        if (newTime.seconds === 60) {
          newTime.seconds = 0;
          newTime.minutes++;
        }
        if (newTime.minutes === 60) {
          newTime.minutes = 0;
          newTime.hours++;
        }
        return newTime;
      });
    }, 1000));
  };

  const stopTimer = () => {
    setRunning(false);
    clearInterval(timer); // Limpa o intervalo usando o ID armazenado em timer
    setTimer(null); // Reseta o timer para null
  };

  const resetTimer = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    clearInterval(timer); // Limpa o intervalo usando o ID armazenado em timer
    setTimer(null); // Reseta o timer para null
  };


  return (
    <Flex
      justify={'center'}
      align={'center'}
      height={'100vh'}
    >

      {/** card para conter o cronometro */}
      <Card>
        <CardBody>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>

            {/** title para o cronometro */}
            <GridItem colSpan={5} textAlign={'center'}>
              <Box fontSize="2x1">
                Cronômetro
              </Box>
            </GridItem>

            {/* Exibição do tempo atual */}
            <GridItem colSpan={5} textAlign={'center'}>
              <Box fontSize="4x1">
                {/* Exibe o tempo formatado como "horas:minutos:segundos" */}
                {`${time.hours.toString().padStart(2, '0')}:
                  ${time.minutes.toString().padStart(2, '0')}:
                  ${time.seconds.toString().padStart(2, '0')}`
                };
              </Box>
            </GridItem>

            {/* Botões de controle do cronômetro */}
            <GridItem colSpan={5} textAlign={'center'} >
              {/* Renderiza o botão "Start" se o cronômetro não estiver em execução
            // ou  renderiza o botão "Parar" se o cronômetro estiver em execução  */}
              {!running ? (
                <Button colorScheme="green" margin={'2px'} onClick={startTimer}>
                  Start
                </Button>
              ) : (
                <Button colorScheme="red" margin={'2px'} onClick={stopTimer}>
                  Stop
                </Button>
              )
              }

              {/* Botão de resetar sempre é renderizado */}
              <Button colorScheme="blue" margin={'2px'} onClick={resetTimer}>
                Reset
              </Button>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </Flex>
  );
}
