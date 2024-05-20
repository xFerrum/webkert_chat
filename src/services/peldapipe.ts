import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'peldapipe',
    standalone: true
})

export class PeldaPipe implements PipeTransform
{
    transform(word: String): String
    {
        if (!word) return word;
        return word.split("").join(" ");
    }
}