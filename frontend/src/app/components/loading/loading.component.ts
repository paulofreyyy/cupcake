import { Component, inject } from "@angular/core";
import { LoadingHelper } from "../../shared/helpers/loading.helper";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls:  ['./loading.component.css'],
    imports: [CommonModule]
})
export class LoadingComponent {
    private loadingHelper = inject(LoadingHelper)
    loading$ = this.loadingHelper.loading$;
}