import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface ConveyorBelt {
  id: number;
  conveyor_belt_id: number;
  speed: number;
  consumption: number;
  date: Date;
}

export default function Section() {
  const param = useParams();

  const [conveyorBelts, setConveyorBelts] = useState<ConveyorBelt[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://baggiogiacomosimulazioneapi.azurewebsites.net/api/DataGen/${param.id}`
    )
      .then((res) => res.json())
      .then((res) => setConveyorBelts(res));
    setIsLoading(false);
  }, [param.id]);

  return (
    <Flex w={"full"} direction={"column"}>
      <Heading as="h1" fontSize={"5xl"} textAlign="center">
        Section {param.id}
      </Heading>
      <Link to="/" style={{ position: "absolute", top: 20, left: 20 }}>
        Go back!
      </Link>
      {!isLoading ? (
        conveyorBelts?.length === 0 ? (
          <Flex w={"full"} justifyContent={"center"} my={"20"}>
            There is no data avilable for this section
          </Flex>
        ) : (
          <Flex direction={"column"}>
            <TableContainer w={"80%"} m="auto" my={"20"}>
              <Table variant="simple">
                <TableCaption>Conveyor belts data</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Conveyor belt id</Th>
                    <Th>Speed</Th>
                    <Th>Consumption</Th>
                    <Th>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {conveyorBelts?.map((conveyorBelt, index) => (
                    <Tr key={index}>
                      <Td>{conveyorBelt.conveyor_belt_id}</Td>
                      <Td>{conveyorBelt.speed}</Td>
                      <Td>{conveyorBelt.consumption}</Td>
                      <Td>{`${
                        conveyorBelt.date.toString().split("T")[0]
                      } ${conveyorBelt.date
                        .toString()
                        .split("T")[1]
                        .slice(0, -4)}`}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        )
      ) : (
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            my={"40"}
          />
        </Flex>
      )}
    </Flex>
  );
}
