import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface CardProps {
  number: number;
}

export default function Card({ number }: CardProps) {
  return (
    <Box
      minW={"22%"}
      maxW={"30%"}
      w={"auto"}
      h={"100px"}
      m={"18"}
      p={"18"}
      borderRadius={10}
      backgroundColor="lightcoral"
      transition={"all 0.2s ease-in-out"}
      sx={{
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Link
        to={`/section/${number}`}
        style={{
          height: "100%",
          width: "100%",
          display: "block",
          textDecoration: "none",
          color: "black",
          marginTop: "auto",
        }}
      >
        <Flex
          h={"100%"}
          w={"full"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text fontWeight={"bold"}>{`Section ${number}`}</Text>
        </Flex>
      </Link>
    </Box>
  );
}
