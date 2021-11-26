import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import { categories } from "../../utils/categories";
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer
} from "./styles";

interface CategoryProp {
  key: string;
  name: string;
}

interface Props {
  category: CategoryProp;
  setCategory: (category: CategoryProp) => void;
  closeSelectCategory: () => void;
}

export const CategorySelect = ({
  category,
  closeSelectCategory,
  setCategory
}: Props) => {
  const handleCategorySelect = (category: CategoryProp) => {
    setCategory(category);
  };

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Category
            isActive={category.key === item.key}
            onPress={() => handleCategorySelect(item)}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
};
