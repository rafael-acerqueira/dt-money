import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionContext";

interface SearchFormInputs {
  query: string
}

export function SearchForm() {

  const { loadTransactions } = useContext(TransactionsContext)

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormInputs>()

  async function handleSearchTransaction(data: SearchFormInputs) {
    await loadTransactions(data.query)
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