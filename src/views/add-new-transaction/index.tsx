import TransactionForm from "../../components/transaction-form"
import { Idb } from "../../utility/IDB"

const NewTransaction = ({ db }: { db: Idb }) => {

  return (
    <TransactionForm db={db} />
  )
}

export default NewTransaction