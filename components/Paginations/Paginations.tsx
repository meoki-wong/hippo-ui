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
	/**
	 * 判断条件  是否显示省略页码
	 * @param { number } item 当前循环的页码
	 * @returns { boolean }  true | false
	 */
	const judgPageCondition = (item: number) => {
		let pageIndex: boolean
		if(active === pageArr[0] || active === pageArr[1]){
			pageIndex = Math.abs(active - item) < 6 - active
		} else if(active === pageArr[pageArr.length - 1] || active === pageArr[pageArr.length - 2]){
			pageIndex = Math.abs(active - item) < 5 - (pageArr[pageArr.length - 1] - active)
		} else {
			pageIndex = Math.abs(active - item) < 3
		}
		return pageIndex || item === pageArr[0] || item === pageArr[pageArr.length - 1]
	}
	const pageItem = () => {
		/**总分页数量少于 @pageSize 页的情况下 */
		if (pageArr.length < pageSize) {
			return pageArr.map(item => {
				return <li
					className={item === active ? "active-page" : ""}
					onClick={() => changePage(item)}>{item}</li>
			})
		} else { /**总分页数量大于 @pageSize 页的情况下 */
			let pageLengthArr: any = []
			pageArr.forEach((item: number) => {
				if (judgPageCondition(item)) {
					pageLengthArr.push(item)
				} else {
					// 过滤相同的省略事件
					if (pageLengthArr[pageLengthArr.length - 1] === '...') return
					pageLengthArr.push('...')
				}
			})
			return pageLengthArr.map((item: number | string) => {
				if (item !== '...') {
					return <li
						className={item === active ? "active-page" : ""}
						onClick={() => typeof item === 'number' && changePage(item)}>{item}</li>
				} else {
					return <li>
						<i className="iconfont icon-gengduo"></i>
					</li>
				}
			})
		}
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
