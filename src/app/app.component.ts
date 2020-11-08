import { Component, OnInit } from "@angular/core";
import { ApiExchange } from "./services/api-exchange.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private currency;

  constructor(private _apiExchange: ApiExchange) {}

  ngOnInit(): void {
    this.getData();

    // Второй вариант
    // this._apiExchange.sourcesCall().subscribe(data => {
    //   this.modifyCurrency(data);
    // });
  }

  async getData() {
    for (let i = 0; i < this._apiExchange.sources.length; i++) {
      try {
        const url: string = this._apiExchange.sources[i];
        const firstData = await (await fetch(url)).json();

        this.modifyCurrency(firstData);

        setInterval(() => {
          fetch(url)
            .then(result => result.json())
            .then(data => {
              this.modifyCurrency(data);
            })
            .catch(err => {
              this.getData();
            });
        }, 10000);
        break;
      } catch {
        console.log(`Упал ${i + 1} запрос`);
        continue;
      }
    }
  }

  modifyCurrency(data) {
    this.currency = data["Valute"].EUR.Value;
  }
}
