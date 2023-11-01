import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';


@Directive({
    selector: '[tableSearch]'
})
export class TableSearchDirectives{
    @Input() tableSearch : any;
    constructor(
        private el : ElementRef,
        private renderer : Renderer2
    ){}

    @HostListener('input') Dds(){
        Array.from(this.tableSearch.children).forEach(elem => {
            this.filter(elem, this.el.nativeElement.value.toLowerCase().trim());
        })
    }

    filter(input: any, value: any){
        if(input.innerText.toLowerCase().includes(value)){
            this.renderer.setStyle(input, 'display', 'table-row');
          }else{
            this.renderer.setStyle(input, 'display', 'none');
          }

    }
}
