import React from "react";
import { HStack, Badge } from "native-base";

const CategoryBadge = () => {
    return (
        <HStack flexWrap="wrap" mt={20} mb={5} justifyContent="center">
            <Badge my="1" mx="3" colorScheme="orange">Technical Support</Badge>
            <Badge my="1" mx="3" colorScheme="teal">Billing Support</Badge>
            <Badge my="1" mx="3" colorScheme="red">Security Issue</Badge>
            <Badge my="1" mx="3" colorScheme="lime">Car Park Issue</Badge>
            <Badge my="1" mx="3" colorScheme="indigo">Defect of Common Area</Badge>
            <Badge my="1" mx="3" colorScheme="fuchsia">Suggestion</Badge>
            <Badge my="1" mx="3" colorScheme="gray">Others</Badge>
        </HStack>
    );
}

export default CategoryBadge;