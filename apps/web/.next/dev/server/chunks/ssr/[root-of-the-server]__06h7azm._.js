module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[project]/apps/web/app/admin/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "default",
    ()=>AdminPage,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/src/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$analytics$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/repositories/analytics.repository.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$analytics$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$analytics$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const dynamic = "force-dynamic";
async function AdminPage() {
    const analytics = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$analytics$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCorpusAnalytics"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            padding: 32
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Egyptian Law — Admin"
            }, void 0, false, {
                fileName: "[project]/apps/web/app/admin/page.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Minimal HITL dashboard for corpus management."
            }, void 0, false, {
                fileName: "[project]/apps/web/app/admin/page.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 16,
                    marginTop: 24,
                    marginBottom: 32
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Laws",
                        value: analytics.lawCount
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/admin/page.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Articles",
                        value: analytics.chunkCount
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/admin/page.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Embeddings",
                        value: analytics.embeddingCount
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/admin/page.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Unembedded",
                        value: analytics.unembeddedChunks
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/admin/page.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/admin/page.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Corpus"
            }, void 0, false, {
                fileName: "[project]/apps/web/app/admin/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                style: {
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    align: "left",
                                    children: "Law"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/admin/page.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    align: "left",
                                    children: "Number"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/admin/page.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    align: "left",
                                    children: "Year"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/admin/page.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    align: "right",
                                    children: "Articles"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/admin/page.tsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/admin/page.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/admin/page.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: analytics.laws.map((law)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: law.lawName
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/admin/page.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: law.lawNumber ?? "-"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/admin/page.tsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: law.year ?? "-"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/admin/page.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        align: "right",
                                        children: law._count.chunks
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/admin/page.tsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, law.id, true, {
                                fileName: "[project]/apps/web/app/admin/page.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/web/app/admin/page.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/admin/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/app/admin/page.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
function Stat({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            border: "1px solid #ddd",
            padding: 20,
            borderRadius: 8
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 13,
                    opacity: 0.7
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/apps/web/app/admin/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 32,
                    fontWeight: 700,
                    marginTop: 8
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/apps/web/app/admin/page.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/app/admin/page.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/apps/web/app/admin/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/web/app/admin/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/apps/web/app/favicon.ico (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/favicon.2vob68tjqpejf.ico" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/apps/web/app/favicon.ico.mjs { IMAGE => \"[project]/apps/web/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/apps/web/app/favicon.ico (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 256,
    height: 256
};
}),
"[project]/packages/db/.env (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/.env.2r-ubk_s-493t" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/packages/db/generated/prisma/client.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This file should be your main import to use Prisma. Through it you get access to all the models, enums, and input types.
 * If you're looking for something you can import in the client-side of your application, please refer to the `browser.ts` file instead.
 *
 * 🟢 You can import this file directly.
 */ __turbopack_context__.s([
    "PrismaClient",
    ()=>PrismaClient
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$class$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/generated/prisma/internal/class.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/generated/prisma/internal/prismaNamespace.ts [app-rsc] (ecmascript)");
var __TURBOPACK__import$2e$meta__ = {
    get url () {
        return __turbopack_context__.F("packages/db/generated/prisma/client.ts");
    },
    env: {
        DEV: true,
        PROD: false,
        MODE: "development",
        BASE_URL: "/",
        SSR: true
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
;
;
globalThis['__dirname'] = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["dirname"]((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"])(__TURBOPACK__import$2e$meta__.url));
;
;
;
;
const PrismaClient = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$class$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrismaClientClass"]();
;
}),
"[project]/packages/db/generated/prisma/internal/class.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPrismaClientClass",
    ()=>getPrismaClientClass
]);
/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * Please import the `PrismaClient` class from the `client.ts` file instead.
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client/runtime/client [external] (@prisma/client/runtime/client, cjs, [project]/node_modules/@prisma/client)");
;
const config = {
    "previewFeatures": [],
    "clientVersion": "7.9.1",
    "engineVersion": "e922089b7d7502aff4249d5da3420f6fa55fc6ad",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel LawDocument {\n  id        String  @id\n  lawName   String  @map(\"law_name\")\n  lawNumber String? @map(\"law_number\")\n  year      String?\n\n  jurisdiction String\n  language     String\n\n  sourceFile String @map(\"source_file\")\n\n  parserVersion        String? @map(\"parser_version\")\n  normalizationVersion String? @map(\"normalization_version\")\n\n  chunks LawChunk[]\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  @@index([lawName])\n  @@index([lawNumber])\n  @@index([year])\n  @@map(\"law_documents\")\n}\n\nmodel LawChunk {\n  id         String @id\n  documentId String @map(\"document_id\")\n\n  articleNumber String  @map(\"article_number\")\n  articleTitle  String? @map(\"article_title\")\n\n  text             String\n  textForEmbedding String @map(\"text_for_embedding\")\n\n  sourcePageStart Int? @map(\"source_page_start\")\n  sourcePageEnd   Int? @map(\"source_page_end\")\n\n  sourceOrder Int? @map(\"source_order\")\n\n  hierarchy Json?\n\n  parserVersion        String? @map(\"parser_version\")\n  normalizationVersion String? @map(\"normalization_version\")\n  ocrConfidence        Float?  @map(\"ocr_confidence\")\n\n  document  LawDocument        @relation(fields: [documentId], references: [id], onDelete: Cascade)\n  embedding LawChunkEmbedding?\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  @@unique([documentId, articleNumber])\n  @@index([documentId])\n  @@index([articleNumber])\n  @@map(\"law_chunks\")\n}\n\nmodel LawChunkEmbedding {\n  chunkId String @id @map(\"chunk_id\")\n\n  model      String\n  dimensions Int\n  embedding  Unsupported(\"vector(1024)\")\n\n  chunk LawChunk @relation(fields: [chunkId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n\n  @@map(\"law_chunk_embeddings\")\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"LawDocument\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lawName\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"law_name\"},{\"name\":\"lawNumber\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"law_number\"},{\"name\":\"year\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"jurisdiction\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"language\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sourceFile\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"source_file\"},{\"name\":\"parserVersion\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"parser_version\"},{\"name\":\"normalizationVersion\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"normalization_version\"},{\"name\":\"chunks\",\"kind\":\"object\",\"type\":\"LawChunk\",\"relationName\":\"LawChunkToLawDocument\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"}],\"dbName\":\"law_documents\"},\"LawChunk\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"documentId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"document_id\"},{\"name\":\"articleNumber\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"article_number\"},{\"name\":\"articleTitle\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"article_title\"},{\"name\":\"text\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"textForEmbedding\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"text_for_embedding\"},{\"name\":\"sourcePageStart\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"source_page_start\"},{\"name\":\"sourcePageEnd\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"source_page_end\"},{\"name\":\"sourceOrder\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"source_order\"},{\"name\":\"hierarchy\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"parserVersion\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"parser_version\"},{\"name\":\"normalizationVersion\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"normalization_version\"},{\"name\":\"ocrConfidence\",\"kind\":\"scalar\",\"type\":\"Float\",\"dbName\":\"ocr_confidence\"},{\"name\":\"document\",\"kind\":\"object\",\"type\":\"LawDocument\",\"relationName\":\"LawChunkToLawDocument\"},{\"name\":\"embedding\",\"kind\":\"object\",\"type\":\"LawChunkEmbedding\",\"relationName\":\"LawChunkToLawChunkEmbedding\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"}],\"dbName\":\"law_chunks\"},\"LawChunkEmbedding\":{\"fields\":[{\"name\":\"chunkId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"chunk_id\"},{\"name\":\"model\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dimensions\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"chunk\",\"kind\":\"object\",\"type\":\"LawChunk\",\"relationName\":\"LawChunkToLawChunkEmbedding\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"}],\"dbName\":\"law_chunk_embeddings\"}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"document\",\"chunk\",\"embedding\",\"chunks\",\"_count\",\"LawDocument.findUnique\",\"LawDocument.findUniqueOrThrow\",\"LawDocument.findFirst\",\"LawDocument.findFirstOrThrow\",\"LawDocument.findMany\",\"data\",\"LawDocument.createOne\",\"LawDocument.createMany\",\"LawDocument.createManyAndReturn\",\"LawDocument.updateOne\",\"LawDocument.updateMany\",\"LawDocument.updateManyAndReturn\",\"create\",\"update\",\"LawDocument.upsertOne\",\"LawDocument.deleteOne\",\"LawDocument.deleteMany\",\"having\",\"_min\",\"_max\",\"LawDocument.groupBy\",\"LawDocument.aggregate\",\"LawChunk.findUnique\",\"LawChunk.findUniqueOrThrow\",\"LawChunk.findFirst\",\"LawChunk.findFirstOrThrow\",\"LawChunk.findMany\",\"LawChunk.createOne\",\"LawChunk.createMany\",\"LawChunk.createManyAndReturn\",\"LawChunk.updateOne\",\"LawChunk.updateMany\",\"LawChunk.updateManyAndReturn\",\"LawChunk.upsertOne\",\"LawChunk.deleteOne\",\"LawChunk.deleteMany\",\"_avg\",\"_sum\",\"LawChunk.groupBy\",\"LawChunk.aggregate\",\"LawChunkEmbedding.findUnique\",\"LawChunkEmbedding.findUniqueOrThrow\",\"LawChunkEmbedding.findFirst\",\"LawChunkEmbedding.findFirstOrThrow\",\"LawChunkEmbedding.findMany\",\"LawChunkEmbedding.updateOne\",\"LawChunkEmbedding.updateMany\",\"LawChunkEmbedding.updateManyAndReturn\",\"LawChunkEmbedding.deleteOne\",\"LawChunkEmbedding.deleteMany\",\"LawChunkEmbedding.groupBy\",\"LawChunkEmbedding.aggregate\",\"AND\",\"OR\",\"NOT\",\"chunkId\",\"model\",\"dimensions\",\"createdAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"id\",\"documentId\",\"articleNumber\",\"articleTitle\",\"text\",\"textForEmbedding\",\"sourcePageStart\",\"sourcePageEnd\",\"sourceOrder\",\"hierarchy\",\"parserVersion\",\"normalizationVersion\",\"ocrConfidence\",\"updatedAt\",\"string_contains\",\"string_starts_with\",\"string_ends_with\",\"array_starts_with\",\"array_ends_with\",\"array_contains\",\"lawName\",\"lawNumber\",\"year\",\"jurisdiction\",\"language\",\"sourceFile\",\"every\",\"some\",\"none\",\"documentId_articleNumber\",\"is\",\"isNot\",\"disconnect\",\"delete\",\"connect\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "pwEdLA8GAABoACA8AABmADA9AAALABA-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-ACAbAAB9ACAsAAB8ACAtAAB_ACBRAAB6ACBUAAB6ACBVAAB6ACBWAAB6ACBXAAB6ACBYAAB6ACBZAAB6ACBaAAB6ACASPAAAWQAwPQAANAAQPgAAWQAwQkAATAAhTgEASgAhTwEASgAhUAEASgAhUQEAWgAhUgEASgAhUwEASgAhVAIAWwAhVQIAWwAhVgIAWwAhVwAAXAAgWAEAWgAhWQEAWgAhWggAXQAhW0AATAAhAwAAAAMAIAEAADMAMBkAADQAIAMAAAADACABAAAEADACAAAFACAIBAAAWAAgPAAAVAAwPQAABwAQPgAAVAAwPwEAAAABQAEAVQAhQQIAVgAhQkAAVwAhAQAAADcAIAEAAAA3ACABBAAAeQAgAwAAAAcAIAEAADoAMAIAADcAIAMAAAAHACABAAA6ADACAAA3ACADAAAABwAgAQAAOgAwAgAANwAgBQQAAHgAID8BAHUAIUABAHUAIUECAHYAIUJAAHcAIQIAAAA3ACANAAA-ACAEPwEAdQAhQAEAdQAhQQIAdgAhQkAAdwAhAgAAAAcAIA0AAEAAIAIAAAAHACANAABAACABAAAANwAgAQAAAAcAIAUHAABwACAaAABzACAbAAByACAsAABxACAtAAB0ACAHPAAASQAwPQAARgAQPgAASQAwPwEASgAhQAEASgAhQQIASwAhQkAATAAhAwAAAAcAIAEAAEUAMBkAAEYAIAMAAAAHACABAAA6ADACAAA3ACAHPAAASQAwPQAARgAQPgAASQAwPwEASgAhQAEASgAhQQIASwAhQkAATAAhDgcAAE4AIBoAAFMAIBsAAFMAIEMBAAAAAUQBAAAABEUBAAAABEYBAAAAAUcBAAAAAUgBAAAAAUkBAAAAAUoBAFIAIUsBAAAAAUwBAAAAAU0BAAAAAQ0HAABOACAaAABOACAbAABOACAsAABRACAtAABOACBDAgAAAAFEAgAAAARFAgAAAARGAgAAAAFHAgAAAAFIAgAAAAFJAgAAAAFKAgBQACELBwAATgAgGgAATwAgGwAATwAgQ0AAAAABREAAAAAERUAAAAAERkAAAAABR0AAAAABSEAAAAABSUAAAAABSkAATQAhCwcAAE4AIBoAAE8AIBsAAE8AIENAAAAAAURAAAAABEVAAAAABEZAAAAAAUdAAAAAAUhAAAAAAUlAAAAAAUpAAE0AIQhDAgAAAAFEAgAAAARFAgAAAARGAgAAAAFHAgAAAAFIAgAAAAFJAgAAAAFKAgBOACEIQ0AAAAABREAAAAAERUAAAAAERkAAAAABR0AAAAABSEAAAAABSUAAAAABSkAATwAhDQcAAE4AIBoAAE4AIBsAAE4AICwAAFEAIC0AAE4AIEMCAAAAAUQCAAAABEUCAAAABEYCAAAAAUcCAAAAAUgCAAAAAUkCAAAAAUoCAFAAIQhDCAAAAAFECAAAAARFCAAAAARGCAAAAAFHCAAAAAFICAAAAAFJCAAAAAFKCABRACEOBwAATgAgGgAAUwAgGwAAUwAgQwEAAAABRAEAAAAERQEAAAAERgEAAAABRwEAAAABSAEAAAABSQEAAAABSgEAUgAhSwEAAAABTAEAAAABTQEAAAABC0MBAAAAAUQBAAAABEUBAAAABEYBAAAAAUcBAAAAAUgBAAAAAUkBAAAAAUoBAFMAIUsBAAAAAUwBAAAAAU0BAAAAAQgEAABYACA8AABUADA9AAAHABA-AABUADA_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-AABUADA_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"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await __turbopack_context__.A("[externals]/node:buffer [external] (node:buffer, cjs, async loader)");
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async ()=>await __turbopack_context__.A("[externals]/@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs [external] (@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs, esm_import, [project]/node_modules/@prisma/client, async loader)"),
    getQueryCompilerWasmModule: async ()=>{
        const { wasm } = await __turbopack_context__.A("[externals]/@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs [external] (@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs, esm_import, [project]/node_modules/@prisma/client, async loader)");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["getPrismaClient"](config);
}
}),
"[project]/packages/db/generated/prisma/internal/prismaNamespace.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnyNull",
    ()=>AnyNull,
    "DbNull",
    ()=>DbNull,
    "Decimal",
    ()=>Decimal,
    "JsonNull",
    ()=>JsonNull,
    "JsonNullValueFilter",
    ()=>JsonNullValueFilter,
    "LawChunkEmbeddingScalarFieldEnum",
    ()=>LawChunkEmbeddingScalarFieldEnum,
    "LawChunkScalarFieldEnum",
    ()=>LawChunkScalarFieldEnum,
    "LawDocumentScalarFieldEnum",
    ()=>LawDocumentScalarFieldEnum,
    "ModelName",
    ()=>ModelName,
    "NullTypes",
    ()=>NullTypes,
    "NullableJsonNullValueInput",
    ()=>NullableJsonNullValueInput,
    "NullsOrder",
    ()=>NullsOrder,
    "PrismaClientInitializationError",
    ()=>PrismaClientInitializationError,
    "PrismaClientKnownRequestError",
    ()=>PrismaClientKnownRequestError,
    "PrismaClientRustPanicError",
    ()=>PrismaClientRustPanicError,
    "PrismaClientUnknownRequestError",
    ()=>PrismaClientUnknownRequestError,
    "PrismaClientValidationError",
    ()=>PrismaClientValidationError,
    "QueryMode",
    ()=>QueryMode,
    "SortOrder",
    ()=>SortOrder,
    "Sql",
    ()=>Sql,
    "TransactionIsolationLevel",
    ()=>TransactionIsolationLevel,
    "defineExtension",
    ()=>defineExtension,
    "empty",
    ()=>empty,
    "getExtensionContext",
    ()=>getExtensionContext,
    "join",
    ()=>join,
    "prismaVersion",
    ()=>prismaVersion,
    "raw",
    ()=>raw,
    "sql",
    ()=>sql
]);
/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * All exports from this file are wrapped under a `Prisma` namespace object in the client.ts file.
 * While this enables partial backward compatibility, it is not part of the stable public API.
 *
 * If you are looking for your Models, Enums, and Input Types, please import them from the respective
 * model files in the `model` directory!
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client/runtime/client [external] (@prisma/client/runtime/client, cjs, [project]/node_modules/@prisma/client)");
;
const PrismaClientKnownRequestError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientKnownRequestError"];
const PrismaClientUnknownRequestError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientUnknownRequestError"];
const PrismaClientRustPanicError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientRustPanicError"];
const PrismaClientInitializationError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientInitializationError"];
const PrismaClientValidationError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientValidationError"];
const sql = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["sqltag"];
const empty = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["empty"];
const join = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["join"];
const raw = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["raw"];
const Sql = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Sql"];
const Decimal = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Decimal"];
const getExtensionContext = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Extensions"].getExtensionContext;
const prismaVersion = {
    client: "7.9.1",
    engine: "e922089b7d7502aff4249d5da3420f6fa55fc6ad"
};
const NullTypes = {
    DbNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].DbNull,
    JsonNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].JsonNull,
    AnyNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].AnyNull
};
const DbNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["DbNull"];
const JsonNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["JsonNull"];
const AnyNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["AnyNull"];
const ModelName = {
    LawDocument: 'LawDocument',
    LawChunk: 'LawChunk',
    LawChunkEmbedding: 'LawChunkEmbedding'
};
const TransactionIsolationLevel = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["makeStrictEnum"]({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
const LawDocumentScalarFieldEnum = {
    id: 'id',
    lawName: 'lawName',
    lawNumber: 'lawNumber',
    year: 'year',
    jurisdiction: 'jurisdiction',
    language: 'language',
    sourceFile: 'sourceFile',
    parserVersion: 'parserVersion',
    normalizationVersion: 'normalizationVersion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const LawChunkScalarFieldEnum = {
    id: 'id',
    documentId: 'documentId',
    articleNumber: 'articleNumber',
    articleTitle: 'articleTitle',
    text: 'text',
    textForEmbedding: 'textForEmbedding',
    sourcePageStart: 'sourcePageStart',
    sourcePageEnd: 'sourcePageEnd',
    sourceOrder: 'sourceOrder',
    hierarchy: 'hierarchy',
    parserVersion: 'parserVersion',
    normalizationVersion: 'normalizationVersion',
    ocrConfidence: 'ocrConfidence',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const LawChunkEmbeddingScalarFieldEnum = {
    chunkId: 'chunkId',
    model: 'model',
    dimensions: 'dimensions',
    createdAt: 'createdAt'
};
const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
const NullableJsonNullValueInput = {
    DbNull: DbNull,
    JsonNull: JsonNull
};
const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
const NullsOrder = {
    first: 'first',
    last: 'last'
};
const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull
};
const defineExtension = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Extensions"].defineExtension;
}),
"[project]/packages/db/generated/prisma/internal/prismaNamespace.ts [app-rsc] (ecmascript) <export * as Prisma>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Prisma",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/generated/prisma/internal/prismaNamespace.ts [app-rsc] (ecmascript)");
}),
"[project]/packages/db/src/client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
// import { PrismaClient } from "@prisma/client";
// export const prisma = new PrismaClient();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/lib/main.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/adapter-pg/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/generated/prisma/client.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
var __TURBOPACK__import$2e$meta__ = {
    get url () {
        return __turbopack_context__.F("packages/db/src/client.ts");
    },
    env: {
        DEV: true,
        PROD: false,
        MODE: "development",
        BASE_URL: "/",
        SSR: true
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].config({
    path: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"])(new __turbopack_context__.U(__turbopack_context__.r("[project]/packages/db/.env (static in ecmascript, tag client)")))
});
const connectionString = `${process.env.DATABASE_URL}`;
console.log("DATABASE_URL:", connectionString.replace(/:[^:@]+@/, ":****@"));
const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PrismaPg"]({
    connectionString
});
const prisma = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PrismaClient"]({
    adapter
});
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/packages/db/src/index.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$corpus$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/repositories/corpus.repository.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$embedding$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/repositories/embedding.repository.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$vector$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/repositories/vector.repository.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$bm25$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/repositories/bm25.repository.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$hybrid$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/repositories/hybrid.repository.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$law$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/repositories/law.repository.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$analytics$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/repositories/analytics.repository.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$corpus$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$embedding$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$vector$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$bm25$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$hybrid$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$law$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$analytics$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$corpus$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$embedding$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$vector$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$bm25$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$hybrid$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$law$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$analytics$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/packages/db/src/repositories/analytics.repository.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "getCorpusAnalytics",
    ()=>getCorpusAnalytics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/client.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function getCorpusAnalytics() {
    const [lawCount, chunkCount, embeddingCount, laws] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].lawDocument.count(),
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].lawChunk.count(),
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].lawChunkEmbedding.count(),
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].lawDocument.findMany({
            select: {
                id: true,
                lawName: true,
                lawNumber: true,
                year: true,
                _count: {
                    select: {
                        chunks: true
                    }
                }
            },
            orderBy: {
                lawName: "asc"
            }
        })
    ]);
    return {
        lawCount,
        chunkCount,
        embeddingCount,
        unembeddedChunks: chunkCount - embeddingCount,
        laws
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/packages/db/src/repositories/bm25.repository.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "searchBm25",
    ()=>searchBm25
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/generated/prisma/client.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Prisma$3e$__ = __turbopack_context__.i("[project]/packages/db/generated/prisma/internal/prismaNamespace.ts [app-rsc] (ecmascript) <export * as Prisma>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/client.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
/**
 * Conservative Arabic stopword list.
 *
 * These words are common in natural-language questions but usually
 * provide little lexical retrieval value.
 */ const ARABIC_STOPWORDS = new Set([
    "ما",
    "ماذا",
    "هل",
    "هي",
    "هو",
    "هم",
    "هن",
    "هذا",
    "هذه",
    "ذلك",
    "تلك",
    "من",
    "في",
    "إلى",
    "على",
    "عن",
    "مع",
    "و",
    "أو",
    "ثم",
    "أن",
    "إن",
    "لا",
    "لم",
    "لن",
    "قد",
    "كان",
    "كانت",
    "يكون",
    "تكون"
]);
/**
 * Tokenize a natural-language Arabic query into lexical terms.
 *
 * Example:
 *
 *   ما هي مدة فترة الاختبار في عقد العمل؟
 *
 * becomes:
 *
 *   ["مدة", "فترة", "الاختبار", "عقد", "العمل"]
 */ function tokenizeQuery(query) {
    return query.trim().split(/\s+/).map((token)=>token.replace(/[؟?!،,.;:()[\]{}"'`]/g, "").trim()).filter((token)=>token.length > 0).filter((token)=>!ARABIC_STOPWORDS.has(token));
}
/**
 * Build the value passed to PostgreSQL to_tsquery().
 *
 * PostgreSQL's `to_tsquery` supports the `|` operator for OR:
 *
 *   مدة | فترة | الاختبار | عقد | العمل
 *
 * The individual terms have already been stripped of characters
 * that could be interpreted as tsquery operators.
 */ function buildOrTsQuery(query) {
    const terms = tokenizeQuery(query);
    return terms.join(" | ");
}
async function searchBm25(input) {
    const query = input.query.trim();
    if (!query) {
        return [];
    }
    if (!Number.isInteger(input.topK) || input.topK <= 0) {
        throw new Error(`Invalid topK: ${input.topK}`);
    }
    const lexicalQuery = buildOrTsQuery(query);
    /**
   * The query may consist entirely of stopwords.
   *
   * Example:
   *
   *   "ما هي"
   *
   * produces no useful lexical terms.
   */ if (!lexicalQuery) {
        return [];
    }
    if (input.lawDocumentId !== undefined) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$queryRaw(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Prisma$3e$__["Prisma"].sql`
        SELECT
          c."id" AS "chunkId",

          ts_rank_cd(
            to_tsvector(
              'simple',
              c."text_for_embedding"
            ),
            to_tsquery(
              'simple',
              ${lexicalQuery}
            )
          )::double precision AS "score"

        FROM "law_chunks" c

        WHERE
          c."document_id" = ${input.lawDocumentId}

          AND to_tsvector(
            'simple',
            c."text_for_embedding"
          ) @@ to_tsquery(
            'simple',
            ${lexicalQuery}
          )

        ORDER BY
          "score" DESC,
          c."id" ASC

        LIMIT ${input.topK}
      `);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$queryRaw(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Prisma$3e$__["Prisma"].sql`
      SELECT
        c."id" AS "chunkId",

        ts_rank_cd(
          to_tsvector(
            'simple',
            c."text_for_embedding"
          ),
          to_tsquery(
            'simple',
            ${lexicalQuery}
          )
        )::double precision AS "score"

      FROM "law_chunks" c

      WHERE
        to_tsvector(
          'simple',
          c."text_for_embedding"
        ) @@ to_tsquery(
          'simple',
          ${lexicalQuery}
        )

      ORDER BY
        "score" DESC,
        c."id" ASC

      LIMIT ${input.topK}
    `);
} // const generalResults = await searchBm25({
 //   query: "ما مدة الاحتفاظ بملف العامل بعد انتهاء علاقة العمل؟",
 //   topK: 92,
 // });
 // console.log("General Search Results:", generalResults);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/packages/db/src/repositories/corpus.repository.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "getChunksByIds",
    ()=>getChunksByIds,
    "upsertCorpus",
    ()=>upsertCorpus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/client.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function upsertCorpus(corpus) {
    const document = corpus.document;
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
        await tx.lawDocument.upsert({
            where: {
                id: document.id
            },
            create: {
                id: document.id,
                lawName: document.law_name,
                lawNumber: document.law_number,
                year: document.year,
                jurisdiction: document.jurisdiction,
                language: document.language,
                sourceFile: document.source_file,
                parserVersion: document.metadata.parser_version,
                normalizationVersion: document.metadata.normalization_version
            },
            update: {
                lawName: document.law_name,
                lawNumber: document.law_number,
                year: document.year,
                jurisdiction: document.jurisdiction,
                language: document.language,
                sourceFile: document.source_file,
                parserVersion: document.metadata.parser_version,
                normalizationVersion: document.metadata.normalization_version
            }
        });
        for (const chunk of corpus.chunks){
            await tx.lawChunk.upsert({
                where: {
                    id: chunk.id
                },
                create: {
                    id: chunk.id,
                    documentId: document.id,
                    articleNumber: chunk.article_number,
                    articleTitle: chunk.article_title,
                    text: chunk.text,
                    textForEmbedding: chunk.text_for_embedding,
                    sourcePageStart: chunk.provenance.page_start,
                    sourcePageEnd: chunk.provenance.page_end,
                    sourceOrder: chunk.source_order,
                    hierarchy: chunk.hierarchy,
                    parserVersion: chunk.metadata.parser_version,
                    normalizationVersion: chunk.metadata.normalization_version,
                    ocrConfidence: chunk.metadata.ocr_confidence
                },
                update: {
                    documentId: document.id,
                    articleNumber: chunk.article_number,
                    articleTitle: chunk.article_title,
                    text: chunk.text,
                    textForEmbedding: chunk.text_for_embedding,
                    sourcePageStart: chunk.provenance.page_start,
                    sourcePageEnd: chunk.provenance.page_end,
                    sourceOrder: chunk.source_order,
                    hierarchy: chunk.hierarchy,
                    parserVersion: chunk.metadata.parser_version,
                    normalizationVersion: chunk.metadata.normalization_version,
                    ocrConfidence: chunk.metadata.ocr_confidence
                }
            });
        }
        return {
            documentId: document.id,
            chunksInserted: corpus.chunks.length
        };
    }, {
        maxWait: 10_000,
        timeout: 60_000
    });
}
function parseHierarchy(value) {
    if (value === null) {
        return [];
    }
    if (!Array.isArray(value)) {
        throw new Error("Invalid law chunk hierarchy: expected an array.");
    }
    return value;
}
async function getChunksByIds(chunkIds) {
    if (chunkIds.length === 0) {
        return [];
    }
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].lawChunk.findMany({
        where: {
            id: {
                in: chunkIds
            }
        },
        include: {
            document: true
        }
    });
    return rows.map((row)=>({
            id: row.id,
            document_id: row.documentId,
            law_name: row.document.lawName,
            law_number: row.document.lawNumber,
            year: row.document.year,
            article_number: row.articleNumber,
            article_title: row.articleTitle,
            hierarchy: parseHierarchy(row.hierarchy),
            text: row.text,
            text_for_embedding: row.textForEmbedding,
            source_order: row.sourceOrder,
            provenance: {
                source_file: row.document.sourceFile,
                page_start: row.sourcePageStart,
                page_end: row.sourcePageEnd
            },
            metadata: {
                parser_version: row.parserVersion ?? "",
                normalization_version: row.normalizationVersion ?? "",
                ocr_confidence: row.ocrConfidence
            }
        }));
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/packages/db/src/repositories/embedding.repository.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "upsertEmbedding",
    ()=>upsertEmbedding,
    "upsertEmbeddings",
    ()=>upsertEmbeddings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/generated/prisma/client.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Prisma$3e$__ = __turbopack_context__.i("[project]/packages/db/generated/prisma/internal/prismaNamespace.ts [app-rsc] (ecmascript) <export * as Prisma>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/client.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function upsertEmbedding(input) {
    if (input.embedding.length !== input.dimensions) {
        throw new Error(`Embedding dimension mismatch for ${input.chunkId}: ` + `expected ${input.dimensions}, got ${input.embedding.length}.`);
    }
    const vector = `[${input.embedding.join(",")}]`;
    await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$executeRaw(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Prisma$3e$__["Prisma"].sql`
      INSERT INTO "law_chunk_embeddings"
        ("chunk_id", "model", "dimensions", "embedding")
      VALUES
        (${input.chunkId}, ${input.model}, ${input.dimensions}, ${vector}::vector)
      ON CONFLICT ("chunk_id")
      DO UPDATE SET
        "model" = EXCLUDED."model",
        "dimensions" = EXCLUDED."dimensions",
        "embedding" = EXCLUDED."embedding"
    `);
}
async function upsertEmbeddings(artifact) {
    if (artifact.records.length === 0) {
        return 0;
    }
    for (const record of artifact.records){
        if (record.dimensions !== artifact.dimensions) {
            throw new Error(`Embedding dimension mismatch for ${record.chunk_id}: ` + `artifact expects ${artifact.dimensions}, ` + `record has ${record.dimensions}.`);
        }
        if (record.embedding.length !== artifact.dimensions) {
            throw new Error(`Invalid embedding length for ${record.chunk_id}: ` + `expected ${artifact.dimensions}, got ${record.embedding.length}.`);
        }
        await upsertEmbedding({
            chunkId: record.chunk_id,
            model: record.model,
            dimensions: record.dimensions,
            embedding: record.embedding
        });
    }
    return artifact.records.length;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/packages/db/src/repositories/hybrid.repository.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "searchHybrid",
    ()=>searchHybrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$vector$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/repositories/vector.repository.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$vector$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$vector$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const DEFAULT_TOP_K = 10;
async function searchHybrid(input) {
    const query = input.query.trim();
    if (!query) {
        return [];
    }
    const topK = input.topK ?? DEFAULT_TOP_K;
    const vectorTopK = input.vectorTopK ?? topK;
    validateOptions({
        topK,
        vectorTopK
    });
    const vectorSearchInput = {
        queryEmbedding: input.queryEmbedding,
        topK: vectorTopK,
        ...input.lawDocumentId !== undefined ? {
            lawDocumentId: input.lawDocumentId
        } : {}
    };
    const vectorResults = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$repositories$2f$vector$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchSimilarEmbeddings"])(vectorSearchInput);
    return vectorResults.map((result, index)=>({
            chunkId: result.chunkId,
            score: result.score,
            vectorScore: result.score,
            vectorRank: index + 1
        })).slice(0, topK);
}
function validateOptions(options) {
    const { topK, vectorTopK } = options;
    if (!Number.isInteger(topK) || topK <= 0) {
        throw new Error(`Invalid topK: ${topK}`);
    }
    if (!Number.isInteger(vectorTopK) || vectorTopK <= 0) {
        throw new Error(`Invalid vectorTopK: ${vectorTopK}`);
    }
} // import { searchBm25, type Bm25SearchResult } from "./bm25.repository";
 // import {
 //   searchSimilarEmbeddings,
 //   type VectorSearchResult,
 // } from "./vector.repository";
 // export interface HybridSearchInput {
 //   query: string;
 //   queryEmbedding: number[];
 //   topK?: number;
 //   vectorTopK?: number;
 //   bm25TopK?: number;
 //   lawDocumentId?: string;
 //   vectorWeight?: number;
 //   bm25Weight?: number;
 //   rrfK?: number;
 // }
 // export interface HybridSearchResult {
 //   chunkId: string;
 //   score: number;
 //   vectorScore: number | null;
 //   bm25Score: number | null;
 //   vectorRank: number | null;
 //   bm25Rank: number | null;
 // }
 // const DEFAULT_TOP_K = 10;
 // const DEFAULT_RRF_K = 60;
 // const DEFAULT_VECTOR_WEIGHT = 1;
 // const DEFAULT_BM25_WEIGHT = 1;
 // export async function searchHybrid(
 //   input: HybridSearchInput,
 // ): Promise<HybridSearchResult[]> {
 //   const query = input.query.trim();
 //   if (!query) {
 //     return [];
 //   }
 //   const topK = input.topK ?? DEFAULT_TOP_K;
 //   const vectorTopK = input.vectorTopK ?? topK;
 //   const bm25TopK = input.bm25TopK ?? topK;
 //   const vectorWeight = input.vectorWeight ?? DEFAULT_VECTOR_WEIGHT;
 //   const bm25Weight = input.bm25Weight ?? DEFAULT_BM25_WEIGHT;
 //   const rrfK = input.rrfK ?? DEFAULT_RRF_K;
 //   validateOptions({
 //     topK,
 //     vectorTopK,
 //     bm25TopK,
 //     vectorWeight,
 //     bm25Weight,
 //     rrfK,
 //   });
 //   const vectorSearchInput = {
 //     queryEmbedding: input.queryEmbedding,
 //     topK: vectorTopK,
 //     ...(input.lawDocumentId !== undefined
 //       ? { lawDocumentId: input.lawDocumentId }
 //       : {}),
 //   };
 //   const bm25SearchInput = {
 //     query,
 //     topK: bm25TopK,
 //     ...(input.lawDocumentId !== undefined
 //       ? { lawDocumentId: input.lawDocumentId }
 //       : {}),
 //   };
 //   const [vectorResults, bm25Results] = await Promise.all([
 //     searchSimilarEmbeddings(vectorSearchInput),
 //     searchBm25(bm25SearchInput),
 //   ]);
 //   return fuseResults(
 //     vectorResults,
 //     bm25Results,
 //     {
 //       vectorWeight,
 //       bm25Weight,
 //       rrfK,
 //     },
 //     topK,
 //   );
 // }
 // function fuseResults(
 //   vectorResults: VectorSearchResult[],
 //   bm25Results: Bm25SearchResult[],
 //   options: {
 //     vectorWeight: number;
 //     bm25Weight: number;
 //     rrfK: number;
 //   },
 //   topK: number,
 // ): HybridSearchResult[] {
 //   const entries = new Map<string, HybridSearchResult>();
 //   vectorResults.forEach((result, index) => {
 //     const rank = index + 1;
 //     const contribution = options.vectorWeight / (options.rrfK + rank);
 //     const existing = entries.get(result.chunkId);
 //     if (existing) {
 //       existing.score += contribution;
 //       existing.vectorScore = result.score;
 //       existing.vectorRank = rank;
 //       return;
 //     }
 //     entries.set(result.chunkId, {
 //       chunkId: result.chunkId,
 //       score: contribution,
 //       vectorScore: result.score,
 //       bm25Score: null,
 //       vectorRank: rank,
 //       bm25Rank: null,
 //     });
 //   });
 //   bm25Results.forEach((result, index) => {
 //     const rank = index + 1;
 //     const contribution = options.bm25Weight / (options.rrfK + rank);
 //     const existing = entries.get(result.chunkId);
 //     if (existing) {
 //       existing.score += contribution;
 //       existing.bm25Score = result.score;
 //       existing.bm25Rank = rank;
 //       return;
 //     }
 //     entries.set(result.chunkId, {
 //       chunkId: result.chunkId,
 //       score: contribution,
 //       vectorScore: null,
 //       bm25Score: result.score,
 //       vectorRank: null,
 //       bm25Rank: rank,
 //     });
 //   });
 //   return [...entries.values()]
 //     .sort((a, b) => {
 //       if (b.score !== a.score) {
 //         return b.score - a.score;
 //       }
 //       return a.chunkId.localeCompare(b.chunkId);
 //     })
 //     .slice(0, topK);
 // }
 // function validateOptions(options: {
 //   topK: number;
 //   vectorTopK: number;
 //   bm25TopK: number;
 //   vectorWeight: number;
 //   bm25Weight: number;
 //   rrfK: number;
 // }): void {
 //   const { topK, vectorTopK, bm25TopK, vectorWeight, bm25Weight, rrfK } =
 //     options;
 //   if (!Number.isInteger(topK) || topK <= 0) {
 //     throw new Error(`Invalid topK: ${topK}`);
 //   }
 //   if (!Number.isInteger(vectorTopK) || vectorTopK <= 0) {
 //     throw new Error(`Invalid vectorTopK: ${vectorTopK}`);
 //   }
 //   if (!Number.isInteger(bm25TopK) || bm25TopK <= 0) {
 //     throw new Error(`Invalid bm25TopK: ${bm25TopK}`);
 //   }
 //   if (!Number.isFinite(vectorWeight) || vectorWeight < 0) {
 //     throw new Error(`Invalid vectorWeight: ${vectorWeight}`);
 //   }
 //   if (!Number.isFinite(bm25Weight) || bm25Weight < 0) {
 //     throw new Error(`Invalid bm25Weight: ${bm25Weight}`);
 //   }
 //   if (vectorWeight === 0 && bm25Weight === 0) {
 //     throw new Error(
 //       "At least one hybrid retrieval weight must be greater than zero.",
 //     );
 //   }
 //   if (!Number.isFinite(rrfK) || rrfK <= 0) {
 //     throw new Error(`Invalid rrfK: ${rrfK}`);
 //   }
 // }
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/packages/db/src/repositories/law.repository.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "createLawChunk",
    ()=>createLawChunk,
    "createLawDocument",
    ()=>createLawDocument,
    "deleteLawChunk",
    ()=>deleteLawChunk,
    "deleteLawDocument",
    ()=>deleteLawDocument,
    "getLawDocument",
    ()=>getLawDocument,
    "listLawDocuments",
    ()=>listLawDocuments,
    "updateLawChunk",
    ()=>updateLawChunk,
    "updateLawDocument",
    ()=>updateLawDocument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/generated/prisma/client.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Prisma$3e$__ = __turbopack_context__.i("[project]/packages/db/generated/prisma/internal/prismaNamespace.ts [app-rsc] (ecmascript) <export * as Prisma>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/client.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function listLawDocuments() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].lawDocument.findMany({
        orderBy: [
            {
                lawName: "asc"
            },
            {
                year: "asc"
            }
        ],
        include: {
            _count: {
                select: {
                    chunks: true
                }
            }
        }
    });
}
async function getLawDocument(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].lawDocument.findUnique({
        where: {
            id
        },
        include: {
            chunks: {
                orderBy: {
                    sourceOrder: "asc"
                },
                include: {
                    embedding: {
                        select: {
                            model: true,
                            dimensions: true,
                            createdAt: true
                        }
                    }
                }
            }
        }
    });
}
async function createLawDocument(input) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].lawDocument.create({
        data: {
            id: input.id,
            lawName: input.lawName,
            lawNumber: input.lawNumber ?? null,
            year: input.year ?? null,
            jurisdiction: input.jurisdiction ?? "EG",
            language: input.language ?? "ar",
            sourceFile: input.sourceFile,
            parserVersion: input.parserVersion ?? null,
            normalizationVersion: input.normalizationVersion ?? null
        }
    });
}
async function updateLawDocument(id, input) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].lawDocument.update({
        where: {
            id
        },
        data: {
            lawName: input.lawName,
            lawNumber: input.lawNumber ?? null,
            year: input.year ?? null,
            jurisdiction: input.jurisdiction ?? "EG",
            language: input.language ?? "ar",
            sourceFile: input.sourceFile,
            parserVersion: input.parserVersion ?? null,
            normalizationVersion: input.normalizationVersion ?? null
        }
    });
}
async function deleteLawDocument(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].lawDocument.delete({
        where: {
            id
        }
    });
}
async function createLawChunk(documentId, input) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].lawChunk.create({
        data: {
            id: input.id,
            documentId,
            articleNumber: input.articleNumber,
            articleTitle: input.articleTitle ?? null,
            text: input.text,
            textForEmbedding: input.textForEmbedding,
            sourcePageStart: input.sourcePageStart ?? null,
            sourcePageEnd: input.sourcePageEnd ?? null,
            sourceOrder: input.sourceOrder ?? null,
            ...input.hierarchy !== undefined ? {
                hierarchy: input.hierarchy === null ? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Prisma$3e$__["Prisma"].JsonNull : input.hierarchy
            } : {},
            parserVersion: input.parserVersion ?? null,
            normalizationVersion: input.normalizationVersion ?? null,
            ocrConfidence: input.ocrConfidence ?? null
        }
    });
}
async function updateLawChunk(id, input) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].lawChunk.update({
        where: {
            id
        },
        data: {
            ...input.articleNumber !== undefined && {
                articleNumber: input.articleNumber
            },
            ...input.articleTitle !== undefined && {
                articleTitle: input.articleTitle
            },
            ...input.text !== undefined && {
                text: input.text
            },
            ...input.textForEmbedding !== undefined && {
                textForEmbedding: input.textForEmbedding
            },
            ...input.sourcePageStart !== undefined && {
                sourcePageStart: input.sourcePageStart
            },
            ...input.sourcePageEnd !== undefined && {
                sourcePageEnd: input.sourcePageEnd
            },
            ...input.sourceOrder !== undefined && {
                sourceOrder: input.sourceOrder
            },
            ...input.hierarchy !== undefined && {
                hierarchy: input.hierarchy === null ? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Prisma$3e$__["Prisma"].JsonNull : input.hierarchy
            },
            ...input.parserVersion !== undefined && {
                parserVersion: input.parserVersion
            },
            ...input.normalizationVersion !== undefined && {
                normalizationVersion: input.normalizationVersion
            },
            ...input.ocrConfidence !== undefined && {
                ocrConfidence: input.ocrConfidence
            }
        }
    });
}
async function deleteLawChunk(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].lawChunk.delete({
        where: {
            id
        }
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/packages/db/src/repositories/vector.repository.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "searchSimilarEmbeddings",
    ()=>searchSimilarEmbeddings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/db/generated/prisma/client.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Prisma$3e$__ = __turbopack_context__.i("[project]/packages/db/generated/prisma/internal/prismaNamespace.ts [app-rsc] (ecmascript) <export * as Prisma>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/db/src/client.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function searchSimilarEmbeddings(input) {
    if (input.queryEmbedding.length === 0) {
        throw new Error("queryEmbedding must not be empty.");
    }
    if (!Number.isInteger(input.topK) || input.topK <= 0) {
        throw new Error(`Invalid topK: ${input.topK}`);
    }
    for (const value of input.queryEmbedding){
        if (!Number.isFinite(value)) {
            throw new Error("queryEmbedding contains a non-finite value.");
        }
    }
    const vector = `[${input.queryEmbedding.join(",")}]`;
    if (input.lawDocumentId !== undefined) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$queryRaw(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Prisma$3e$__["Prisma"].sql`
        SELECT
          e."chunk_id" AS "chunkId",
          1 - (e."embedding" <=> ${vector}::vector) AS "score"
        FROM "law_chunk_embeddings" e
        INNER JOIN "law_chunks" c
          ON c."id" = e."chunk_id"
        WHERE c."document_id" = ${input.lawDocumentId}
        ORDER BY e."embedding" <=> ${vector}::vector
        LIMIT ${input.topK}
      `);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$src$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$queryRaw(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$db$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Prisma$3e$__["Prisma"].sql`
      SELECT
        e."chunk_id" AS "chunkId",
        1 - (e."embedding" <=> ${vector}::vector) AS "score"
      FROM "law_chunk_embeddings" e
      ORDER BY e."embedding" <=> ${vector}::vector
      LIMIT ${input.topK}
    `);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__06h7azm._.js.map