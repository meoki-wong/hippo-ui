import React, { ReactNode, useEffect, useState } from "react";
import { PaginationProps } from "./type/Paginations";
import "./style/Paginations.less";

// 设置分页大小出现省略
let pageSize = 8


export default function Paginations(props: PaginationProps) {
	const { total, onchange } = props;
	const [pageArr, setPageArr] = useState<number[]>([1]);
	let [active, setActive] = useState<number>(1);
	const calcPageArr = (length: number) =>
		Array.from({ length }).map((v, k) => k + 1);
	useEffect(() => {
		setPageArr(calcPageArr(Math.ceil((total || 0) / 10)));
	}, [total]);
	/*
	 * @param item 显示切换的页码
	 */
	const changePage = (item: number) => {
		onchange && onchange(item, 10);
		setActive(item);
	};
	const prePage = () => {
		if (active > 1) {
			changePage(--active);
		}
	};
	const nextPage = () => {
		if (active < pageArr.length) {
			changePage(++active);
		}
	};
	const goLastPage = () => {
		changePage(pageArr[pageArr.length - 1]);
	};
	const goFirstPage = () => {
		changePage(1);
	};
    // 超出页码省略号占位
    const pageOmit = () =>  (<li><i className="iconfont icon-gengduo"></i></li>)

    const pageItem = () => {
		/**总分页数量少于 @pageSize 页的情况下 */
        if(pageArr.length < pageSize){
                return pageArr.map(item=>{
                	return <li 
							className={item === active ? "active-page" : ""}
							onClick={() => changePage(item)}>{item}</li>
            	})
        } else { /**总分页数量大于 @pageSize 页的情况下 */
			let pageLengthArr: any = []
			pageArr.forEach((item: number)=>{
				if(Math.abs(active - item) < 3 || item === pageArr[0] || item === pageArr[pageArr.length-1]){
					pageLengthArr.push(item)
				} else {
					// 过滤相同的省略事件
					if(pageLengthArr[pageLengthArr.length - 1] === '...') return 
					pageLengthArr.push('...')
				}
			})
			return pageLengthArr.map(item=>{
				if(item !=='...'){
					return <li 
							className={item === active ? "active-page" : ""}
							onClick={() => changePage(item)}>{item}</li>
				} else {
					return  <li>
						 		<i className="iconfont icon-gengduo"></i>
						 	</li>
				}
			})
		}

        // 大于特定值的情况下  触发省略
        /**
         * if(pageArr.length > 8){
            if(item>3 && item< pageArr.length - 2){
               return  <li>
                            <i className="iconfont icon-gengduo"></i>
                       </li>
            } else {
                return <li
                        className={item === active ? "active-page" : ""}
                        onClick={() => changePage(item)}
                        key={item}
                        >
                            {item}
                        </li>
            }
        } else {
            // 少于特定值  正常显示
            return <li
                    className={item === active ? "active-page" : ""}
                    onClick={() => changePage(item)}
                    key={item}
                    >
                        {item}
                    </li>
        }
         */


        
    }
	return (
		<div className="pagination-contain">
			<div className="statistic">
				第 <span>{total ? 1 : 0}</span> 页 / 共
				<span>{total || 0}</span> 条
			</div>
			<ul className="pagination-box">
				<li onClick={goFirstPage}>第一页</li>
				<li onClick={prePage}>
					<i className="iconfont icon-shangyiye"></i>
				</li>
                {pageItem()}
				<li onClick={nextPage}>
					<i className="iconfont icon-xiayiye"></i>
				</li>
				<li onClick={goLastPage}>尾页</li>
			</ul>
		</div>
	);
}
