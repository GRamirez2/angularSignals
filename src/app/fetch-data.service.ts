import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { catchError, of, tap } from "rxjs";
import { User } from "./user";

@Injectable({
  providedIn: "root",
})
export class FetchDataService {
  // Inject the HttpClient service
  http = inject(HttpClient);
  private userUrl = "https://jsonplaceholder.typicode.com/users";

  // If you did need a writable signal:
  // Create the writeable signal
  // Issue the http request
  // Use tap to set the signal from the result
  // Unsubscribe when the component is destroyed
  // Subscribe to issue the http request
  public users = signal<User[]>([]);
  public selectedUserId = signal(0);

  private sub$ = this.http
    .get<User[]>(this.userUrl)
    .pipe(
      tap((data) => this.users.set(data)),
      takeUntilDestroyed(),
      catchError(() => of([] as User[]))
    )
    .subscribe();

  public setSelectedUser(id: number) {
    this.selectedUserId.set(id);
  }
}
