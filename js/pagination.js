;
"use strict";
(function (window) {
    let PAGINATION_STYLE_TYPE = [".style_type_0"];
    function getPageArray(current,pageCount,showNumber) {
        let p = [],half = Math.floor(showNumber/2);
        for (let i=0;i<showNumber;i++) {
            p.push(-1);
        }
        if ( current-half<1 ) {
            for (let i=0;i<showNumber;i++) {
                p[i]=(i+1);
            }
        } else  if( current-half>=1 && current+half <= pageCount) {
            for (let i=0;i<showNumber;i++) {
                p[i]=current-half+i;
            }
        }else   if( current+half >= pageCount ) {
            for (let i=0;i<showNumber;i++) {
                p[showNumber-1-i]=pageCount-i;
            }
        }
        return p;
    }
    
    function init(cof) {

        let startTime = new Date().getTime();
        cof.el.setAttribute ("data-pagecount",cof.pageCount);
        if(cof.el.className.indexOf("pagination_wrap") == -1) {
            cof.el.setAttribute ("data-showitem",cof.showItem);
            cof.el.classList.add("pagination_wrap");
            cof.el.addEventListener("click",function (el) {
                if(el.target == undefined || el.target == null || el.target.nodeName !="LI") {
                    return false;
                }
                let pageNumber = el.target.getAttribute("data-pagenumber");
                if(pageNumber == undefined || pageNumber == null) {
                    return false;
                }
                pageNumber = parseInt(pageNumber);
                let ul = el.target.parentNode;
                cof.callBack(pageNumber,parseInt(ul.getAttribute("data-pagecount")),parseInt(ul.getAttribute("data-showitem")));
                if(pageNumber){
                    liFpagination({
                        el:cof.el,
                        current: pageNumber,
                        pageCount:parseInt(ul.getAttribute("data-pagecount")),
                    });
                }
            });
        }else{
            cof.el.innerHTML = "";
            cof.showItem=cof.el.getAttribute("data-showitem");
            cof.styleType = cof.el.getAttribute("data-styletype");
        }

        let a,b,c,d;
        a=document.createElement("li"),
            b=document.createElement("li"),
            c=document.createElement("li"),
            d=document.createElement("li");
        a.innerText="首页",b.innerText="上一页",c.innerText="下一页",d.innerText="尾页";
        if(cof.current != 1){
            a.setAttribute ("data-pagenumber",1),b.setAttribute ("data-pagenumber",cof.current-1);
        }else {
            a.setAttribute ("disabled","disabled"),b.setAttribute ("disabled","disabled");
        }
        if(cof.current != cof.pageCount){
            c.setAttribute("data-pagenumber",cof.current+1),d.setAttribute ("data-pagenumber",cof.pageCount);
        }else {
            c.setAttribute("disabled","disabled"),d.setAttribute ("disabled","disabled");
        }

        cof.el.append(a),cof.el.append(b);
        let showSize = getPageArray(cof.current,cof.pageCount,cof.showItem);

        for (let i=0;i<showSize.length;i++){
            if( showSize[i]>=1&&showSize[i]<=cof.pageCount ) {
                let p = document.createElement("li");
                p.innerText = showSize[i]+"";
                p.setAttribute("data-pagenumber",showSize[i]+"");
                if(showSize[i] == cof.current) {
                    p.className = "active";
                    p.removeAttribute("data-pagenumber");
                }
                cof.el.append(p);
            }
        }
        cof.el.append(c),cof.el.append(d);
        console.log("渲染耗时:"+(new Date().getTime()-startTime));
        return false;
    };
    window.liFpagination=init;
})(window);