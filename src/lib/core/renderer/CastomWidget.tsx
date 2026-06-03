import { useEffect, useRef } from "react";
import { useResolvedDataMany } from "../../hooks/useResolvedData";
import { WidgetProps } from "../../types/schema";
import { useDashboard } from "../../providers/DashboardProvider";
import { ActionExecutor } from "../actions/ActionExecutor";

export interface HtmlWidgetProps {
    html: string;
    css?: string;
    data?: Record<string, unknown>;
    onAction?: (
        action: string,
        element: HTMLElement,
    ) => void;
}

const ALLOWED_TAGS = new Set([
    "div",
    "span",
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "button",
    "img",
    "ul",
    "ol",
    "li",
    "table",
    "thead",
    "tbody",
    "tr",
    "td",
    "th",
    "section",
    "article",
    "header",
    "footer",
    "main",
    "label",
    "input",
    "textarea",
    "select",
    "option",
]);

function getValue(
    obj: Record<string, unknown>,
    path: string,
): unknown {
    return path
        .split(".")
        .reduce<any>(
            (current, key) => current?.[key],
            obj,
        );
}

function applyTemplates(
    root: Node,
    data: Record<string, unknown>,
) {
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
    );

    const textNodes: Text[] = [];

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode as Text);
    }

    for (const node of textNodes) {
        node.textContent = node.textContent?.replace(
            /\{\{\s*([^}]+)\s*\}\}/g,
            (_, path) =>
                String(
                    getValue(data, path.trim()) ?? "",
                ),
        ) ?? "";
    }
}

function sanitizeNode(node: Node): Node | null {
    if (node.nodeType === Node.TEXT_NODE) {
        return node.cloneNode(true);
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
        return null;
    }

    const element = node as HTMLElement;
    const tag = element.tagName.toLowerCase();

    if (!ALLOWED_TAGS.has(tag)) {
        return null;
    }

    const clone = document.createElement(tag);

    for (const attr of Array.from(element.attributes)) {
        const name = attr.name.toLowerCase();

        if (name.startsWith("on")) {
            continue;
        }

        if (
            name === "class" ||
            name === "id" ||
            name === "action-data" ||
            name.startsWith("data-") ||
            name.startsWith("aria-")
        ) {
            clone.setAttribute(
                attr.name,
                attr.value,
            );
        }
    }

    for (const child of Array.from(element.childNodes)) {
        const sanitized = sanitizeNode(child);

        if (sanitized) {
            clone.appendChild(sanitized);
        }
    }

    return clone;
}

function sanitizeHtml(
    html: string,
): DocumentFragment {
    const parser = new DOMParser();

    const doc = parser.parseFromString(
        html,
        "text/html",
    );

    const fragment = document.createDocumentFragment();

    for (const node of Array.from(
        doc.body.childNodes,
    )) {
        const sanitized = sanitizeNode(node);

        if (sanitized) {
            fragment.appendChild(sanitized);
        }
    }

    return fragment;
}

export function HtmlWidgetBlock({
    html,
    css = "",
    data = {},
    onAction,
}: HtmlWidgetProps) {
    const hostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const host = hostRef.current;

        if (!host) {
            return;
        }

        const shadow =
            host.shadowRoot ??
            host.attachShadow({
                mode: "open",
            });

        shadow.replaceChildren();

        const style =
            document.createElement("style");

        style.textContent = css;

        shadow.appendChild(style);

        const fragment =
            sanitizeHtml(html);

        applyTemplates(fragment, data);

        shadow.appendChild(fragment);

        const clickHandler = (
            event: Event,
        ) => {
            const target =
                event.target as HTMLElement;

            const actionElement =
                target.closest(
                    "[action-data]",
                ) as HTMLElement | null;

            if (!actionElement) {
                return;
            }

            const action =
                actionElement.getAttribute(
                    "action-data",
                );

            if (!action) {
                return;
            }

            onAction?.(
                action,
                actionElement,
            );
        };

        shadow.addEventListener(
            "click",
            clickHandler,
        );

        return () => {
            shadow.removeEventListener(
                "click",
                clickHandler,
            );
        };
    }, [html, css, data, onAction]);

    return <div ref={hostRef} />;
}

export const HtmlWidget = ({
    widget,
}:WidgetProps) => {

    const data = useResolvedDataMany(widget.data)
    const {
        store,
        events,
        modals,

    } = useDashboard()
    
    
    const executor =
        new ActionExecutor(
            store,
            events,
            modals,
        )

    const actionHandler = (action: string, element: HTMLElement) => {
        executor.execute({type:"emit", event:action, payload:{element}})
    }

    console.log(widget)

    if(!widget.html)
        return <div>html not found</div>

    return(<HtmlWidgetBlock html={widget.html} css={widget.css} data={data} onAction={actionHandler}/>)
}