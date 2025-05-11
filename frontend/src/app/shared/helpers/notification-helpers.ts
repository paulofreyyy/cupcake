import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class NotificationHelper {
    constructor(private snackbar: MatSnackBar) { }

    showSuccess(message: string): void {
        this.snackbar.open(message, 'Fechar', {
            duration: 3000,
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
            panelClass: 'snack-bar-success'
        })
    }
    showError(message: string): void {
        this.snackbar.open(message, 'Fechar', {
            duration: 3000,
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
            panelClass: 'snack-bar-error'
        })
    }
}