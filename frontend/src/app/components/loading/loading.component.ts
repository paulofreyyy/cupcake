import { Component, inject } from "@angular/core";
import { LoadingHelper } from "../../shared/helpers/loading.helper";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css'],
    imports: [CommonModule, MatProgressSpinnerModule]
})
export class LoadingComponent {
    private loadingHelper = inject(LoadingHelper)
    loading$ = this.loadingHelper.loading$;
}