import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";

interface SearchFormInputs {
  query: string
}

export function SearchForm() {

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormInputs>()

  function handleSearchTransaction(data: SearchFormInputs) {

  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
      <input type="text" placeholder="Busque por transações" {...register('query')} />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}