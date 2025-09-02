import { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";

const Filter = ({ filterFunction, data }) => {
  const [searchQuery, setSearchQuery] = useState<string | null>("");
  useEffect(() => {
    if (searchQuery.trim() === "") {
      filterFunction(null);
      return;
    }
    const query = searchQuery?.toLowerCase().trim() || "";
    const startsWith = data.filter((item) => {
      if (item.name) return item.name.toLowerCase().startsWith(query);
      if (item.number) return item.number.toLowerCase().startsWith(query);
    });
    const includes = data.filter((item) => {
      if (item.name) return item.name.toLowerCase().includes(query);
      if (item.number) return item.number.toLowerCase().includes(query);
    });
    filterFunction([...new Set([...startsWith, ...includes])]);
  }, [searchQuery]);
  return (
    <>
      <Searchbar
        placeholder="Wyszukaj przystanek..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </>
  );
};

export default Filter;
