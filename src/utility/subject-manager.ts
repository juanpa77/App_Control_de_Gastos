import { BehaviorSubject } from "rxjs";
import { Filters } from "../components/transaction-list";
import { formatNumberMonth, getNumberOfMonth } from "./formatDate";

interface Filter {
  name: string
  value: string
}
export class SubjectManager {
  private subject$: BehaviorSubject<Filters> = new BehaviorSubject({
    category: 'todas',
    week: 'todas',
    month: formatNumberMonth(new Date().getMonth()),
    type: 'Expenses'
  })

  get getSubject() {
    return this.subject$.asObservable()
  }

  set setSubject(filter: Filter) {
    if (filter.name === 'month') {
      this.subject$.next({
        ...this.subject$.getValue(),
        [filter.name]: formatNumberMonth(getNumberOfMonth(filter.value))
      })
      return
    }
    this.subject$.next({ ...this.subject$.getValue(), [filter.name]: filter.value })
  }
}