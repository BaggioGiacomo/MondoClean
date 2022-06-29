import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import Card from "components/Card";
import { useEffect, useState } from "react";

interface section {
  id: number;
}

function App() {
  const [sections, setSections] = useState<section[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://baggiogiacomosimulazioneapi.azurewebsites.net/api/Section`)
      .then((res) => res.json())
      .then((res) => setSections(res));

    setIsLoading(false);
  }, []);

  return (
    <Box fontFamily={"Helvetica"} minH="99vh">
      <Heading as="h1" fontSize={"5xl"} textAlign="center" textColor={"red"}>
        Mondo Clean
      </Heading>
      {!isLoading ? (
        <Flex w={"80%"} flexWrap={"wrap"} mx={"auto"} my={"20"}>
          {sections?.map((section) => (
            <Card key={section.id} number={section.id} />
          ))}
        </Flex>
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
    </Box>
  );
}

export default App;
