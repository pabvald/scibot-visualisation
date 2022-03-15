(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["main"],{

/***/ 8255:
/*!*******************************************************!*\
  !*** ./$_lazy_route_resources/ lazy namespace object ***!
  \*******************************************************/
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 8255;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 4190:
/*!**********************************************!*\
  !*** ./src/app/api/document/document.api.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentApi": () => (/* binding */ DocumentApi)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 3882);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);




class DocumentApi {
    constructor(http) {
        this.http = http;
        this.api = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.API_URL}/document`;
    }
    /**
     * @returns all the user ids
     */
    getIds() {
        return this.http.get(`${this.api}/ids`);
    }
    /**
     *
     * @param userID user id
     * @param docId document id
     * @returns
     */
    getDocLayout(userId, docId) {
        return this.http.get(`${this.api}/layout/${userId}/${docId}`);
    }
    /**
     *
     * @param userID user id
     * @param docId document id
     * @returns
     */
    getDocFeatures(userId, docId) {
        return this.http.get(`${this.api}/features/${userId}/${docId}`);
    }
    /**
     *
     * @param userID user id
     * @param docId document id
     * @returns
     */
    getDocRelevance(userId, docId) {
        return this.http.get(`${this.api}/relevance/${userId}/${docId}`);
    }
    /**
     *
     * @param userID user id
     * @param docId document id
     * @param fixationArea fixation area description
     * @returns
     */
    getDocFixation(userId, docId, fixationArea) {
        let httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpParams();
        if (fixationArea) {
            Object.keys(fixationArea).forEach(key => {
                httpParams = httpParams.append(key, fixationArea[key]);
            });
        }
        console.log("getDocFixation() called");
        return this.http.get(`${this.api}/fixation/${userId}/${docId}`, { params: httpParams });
    }
}
DocumentApi.ɵfac = function DocumentApi_Factory(t) { return new (t || DocumentApi)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient)); };
DocumentApi.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: DocumentApi, factory: DocumentApi.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 994:
/*!**************************************!*\
  !*** ./src/app/api/user/user.api.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserApi": () => (/* binding */ UserApi)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 3882);



class UserApi {
    constructor(http) {
        this.http = http;
        this.api = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.API_URL}/user`;
    }
    /**
     * @returns all the user ids
     */
    getIds() {
        return this.http.get(`${this.api}/ids`);
    }
}
UserApi.ɵfac = function UserApi_Factory(t) { return new (t || UserApi)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
UserApi.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: UserApi, factory: UserApi.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 1258);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);



const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule] }); })();


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser */ 1570);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common/http */ 3882);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/platform-browser/animations */ 718);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/tabs */ 9348);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/select */ 7007);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/button */ 781);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/slider */ 3616);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/card */ 2118);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/form-field */ 5788);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/slide-toggle */ 2080);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/input */ 4742);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/progress-spinner */ 181);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/dialog */ 2213);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/checkbox */ 4058);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/snack-bar */ 8456);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _components_app_app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/app/app.component */ 2788);
/* harmony import */ var _components_menu_bar_menu_bar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/menu-bar/menu-bar.component */ 7525);
/* harmony import */ var _components_data_tab_data_tab_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/data-tab/data-tab.component */ 4984);
/* harmony import */ var _components_main_panel_main_panel_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/main-panel/main-panel.component */ 9781);
/* harmony import */ var _components_document_document_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/document/document.component */ 7053);
/* harmony import */ var _components_paragraph_paragraph_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/paragraph/paragraph.component */ 3343);
/* harmony import */ var _components_label_label_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/label/label.component */ 108);
/* harmony import */ var _components_label_tab_label_tab_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/label-tab/label-tab.component */ 5045);
/* harmony import */ var _components_color_legend_color_legend_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/color-legend/color-legend.component */ 9267);
/* harmony import */ var _components_document_details_document_details_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/document-details/document-details.component */ 4733);
/* harmony import */ var _components_paragraph_tab_paragraph_tab_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/paragraph-tab/paragraph-tab.component */ 58);
/* harmony import */ var _components_loading_dialog_loading_dialog_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/loading-dialog/loading-dialog.component */ 7270);
/* harmony import */ var _services_global_http_interceptor_global_http_interceptor_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/global-http-interceptor/global-http-interceptor.service */ 9056);
/* harmony import */ var _services_global_error_handler_global_error_handler_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/global-error-handler/global-error-handler.service */ 6689);
/** Angular */





/** Angular Material imports  */












/** Application Components */













/* Application services */



class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_components_app_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineInjector"]({ providers: [
        { provide: _angular_core__WEBPACK_IMPORTED_MODULE_15__.ErrorHandler, useClass: _services_global_error_handler_global_error_handler_service__WEBPACK_IMPORTED_MODULE_14__.GlobalErrorHandlerService },
        { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_16__.HTTP_INTERCEPTORS, useClass: _services_global_http_interceptor_global_http_interceptor_service__WEBPACK_IMPORTED_MODULE_13__.GlobalHttpInterceptorService, multi: true }
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.BrowserModule,
            _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_16__.HttpClientModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__.BrowserAnimationsModule,
            _angular_material_tabs__WEBPACK_IMPORTED_MODULE_19__.MatTabsModule,
            _angular_material_select__WEBPACK_IMPORTED_MODULE_20__.MatSelectModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_21__.MatButtonModule,
            _angular_material_slider__WEBPACK_IMPORTED_MODULE_22__.MatSliderModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormsModule,
            _angular_material_card__WEBPACK_IMPORTED_MODULE_24__.MatCardModule,
            _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_25__.MatSlideToggleModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_26__.MatFormFieldModule,
            _angular_material_input__WEBPACK_IMPORTED_MODULE_27__.MatInputModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_23__.ReactiveFormsModule,
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_28__.MatProgressSpinnerModule,
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_29__.MatCheckboxModule,
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_30__.MatDialogModule,
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_31__.MatSnackBarModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_components_app_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent,
        _components_menu_bar_menu_bar_component__WEBPACK_IMPORTED_MODULE_2__.MenuBarComponent,
        _components_data_tab_data_tab_component__WEBPACK_IMPORTED_MODULE_3__.DataTabComponent,
        _components_main_panel_main_panel_component__WEBPACK_IMPORTED_MODULE_4__.MainPanelComponent,
        _components_document_document_component__WEBPACK_IMPORTED_MODULE_5__.DocumentComponent,
        _components_paragraph_paragraph_component__WEBPACK_IMPORTED_MODULE_6__.ParagraphComponent,
        _components_label_label_component__WEBPACK_IMPORTED_MODULE_7__.LabelComponent,
        _components_label_tab_label_tab_component__WEBPACK_IMPORTED_MODULE_8__.LabelTabComponent,
        _components_color_legend_color_legend_component__WEBPACK_IMPORTED_MODULE_9__.ColorLegendComponent,
        _components_document_details_document_details_component__WEBPACK_IMPORTED_MODULE_10__.DocumentDetailsComponent,
        _components_paragraph_tab_paragraph_tab_component__WEBPACK_IMPORTED_MODULE_11__.ParagraphTabComponent,
        _components_loading_dialog_loading_dialog_component__WEBPACK_IMPORTED_MODULE_12__.LoadingDialogComponent,
        _components_loading_dialog_loading_dialog_component__WEBPACK_IMPORTED_MODULE_12__.LoadingDialogContent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.BrowserModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_16__.HttpClientModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__.BrowserAnimationsModule,
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_19__.MatTabsModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_20__.MatSelectModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_21__.MatButtonModule,
        _angular_material_slider__WEBPACK_IMPORTED_MODULE_22__.MatSliderModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormsModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_24__.MatCardModule,
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_25__.MatSlideToggleModule,
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_26__.MatFormFieldModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_27__.MatInputModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_23__.ReactiveFormsModule,
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_28__.MatProgressSpinnerModule,
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_29__.MatCheckboxModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_30__.MatDialogModule,
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_31__.MatSnackBarModule] }); })();


/***/ }),

/***/ 2788:
/*!*************************************************!*\
  !*** ./src/app/components/app/app.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _menu_bar_menu_bar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../menu-bar/menu-bar.component */ 7525);
/* harmony import */ var _main_panel_main_panel_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../main-panel/main-panel.component */ 9781);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 1258);
/* harmony import */ var _loading_dialog_loading_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../loading-dialog/loading-dialog.component */ 7270);





class AppComponent {
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 4, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-menu-bar");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-main-panel");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "app-loading-dialog");
    } }, directives: [_menu_bar_menu_bar_component__WEBPACK_IMPORTED_MODULE_0__.MenuBarComponent, _main_panel_main_panel_component__WEBPACK_IMPORTED_MODULE_1__.MainPanelComponent, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet, _loading_dialog_loading_dialog_component__WEBPACK_IMPORTED_MODULE_2__.LoadingDialogComponent], styles: ["[_nghost-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsaUJBQUE7QUFDSiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZmxleC13cmFwOiBub3dyYXA7XHJcbn0iXX0= */"] });


/***/ }),

/***/ 9267:
/*!*******************************************************************!*\
  !*** ./src/app/components/color-legend/color-legend.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColorLegendComponent": () => (/* binding */ ColorLegendComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_facade_label_level_label_level_facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/facade/label-level/label-level.facade */ 4899);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4364);



const _c0 = function (a0) { return { "invisible": a0 }; };
function ColorLegendComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](5, _c0, i_r1 % ctx_r0.SHOW_EACH != 0));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 2, ctx_r0.minFixation + i_r1 * ((ctx_r0.maxFixation - ctx_r0.minFixation) / ctx_r0.SPLITS), "1.0-0"), " ms ");
} }
const _c1 = function (a0) { return { "colored": a0 }; };
class ColorLegendComponent {
    constructor(labelLevelFacade) {
        this.labelLevelFacade = labelLevelFacade;
        this.SPLITS = 20;
        this.SHOW_EACH = 3;
        this.isLabelLevelEnabled = false;
        this.minFixation = 0;
        this.maxFixation = 600;
        // Subscriptions
        this.labelLevelFacade.isEnabled$()
            .subscribe((value) => { this.isLabelLevelEnabled = value; });
        this.labelLevelFacade.getMinFixation$()
            .subscribe((value) => { this.minFixation = value; });
        this.labelLevelFacade.getMaxFixation$()
            .subscribe((value) => { this.maxFixation = value; });
    }
    ngOnInit() {
    }
    /** Generates a range of numbers from 0 to `SPLITS` - 1.*/
    get splitting() {
        return [...Array(this.SPLITS).keys()];
    }
}
ColorLegendComponent.ɵfac = function ColorLegendComponent_Factory(t) { return new (t || ColorLegendComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_facade_label_level_label_level_facade__WEBPACK_IMPORTED_MODULE_0__.LabelLevelFacade)); };
ColorLegendComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ColorLegendComponent, selectors: [["app-color-legend"]], decls: 5, vars: 8, consts: [[3, "ngClass"], [3, "ngClass", 4, "ngFor", "ngForOf"], ["id", "last-one"]], template: function ColorLegendComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ColorLegendComponent_span_1_Template, 3, 7, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "number");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c1, ctx.isLabelLevelEnabled));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.splitting);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" \u2265 ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](4, 3, ctx.minFixation + (ctx.maxFixation - ctx.minFixation), "1.0-0"), " ms ");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.DecimalPipe], styles: ["html[_ngcontent-%COMP%], body[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  max-width: 100%;\n  padding: 0;\n  margin: 0;\n  overflow: hidden;\n}\nbody[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\nhtml[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n@media screen and (min-width: 1800px) {\n  html[_ngcontent-%COMP%] {\n    font-size: calc(13px + 6 * ((100vw - 1800px) / 400));\n  }\n}\n\n\n\n\n\n\n*[_ngcontent-%COMP%]::-webkit-scrollbar, *[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  width: 15px;\n  border-radius: 13px;\n  background-clip: padding-box;\n  border: 5px solid transparent;\n  background-color: white;\n}\n*[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  box-shadow: inset 0 0 0 10px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  box-shadow: none;\n  background-color: white;\n}\n\n.success[_ngcontent-%COMP%] {\n  color: white;\n  background-color: rgba(30, 155, 53, 0.671) !important;\n}\n.success[_ngcontent-%COMP%]   .mat-button-wrapper[_ngcontent-%COMP%] {\n  color: white;\n}\n.error[_ngcontent-%COMP%] {\n  color: white;\n  background-color: #c43404 !important;\n}\n.error[_ngcontent-%COMP%]   .mat-button-wrapper[_ngcontent-%COMP%] {\n  color: white;\n}\n\n  .mat-stroked-button {\n  width: 4vw !important;\n  height: 4vh !important;\n  min-width: -webkit-fit-content;\n  min-width: -moz-fit-content;\n  min-width: fit-content;\n  font-size: 1em;\n}\n\n@media screen and (min-width: 2000px) {\n  .mat-slide-toggle[_ngcontent-%COMP%] {\n    transform: scale(1.4);\n  }\n}\n\n  .mat-slider-horizontal {\n  min-width: 8vw;\n}\n\n@media screen and (min-width: 2000px) {\n  .mat-checkbox-inner-container[_ngcontent-%COMP%] {\n    transform: scale(1.4);\n  }\n}\n@media screen and (min-width: 2000px) {\n  .mat-snack-bar-container[_ngcontent-%COMP%] {\n    transform: scale(1.4) !important;\n  }\n}\n\n  .mat-form-field-infix {\n  border-top: 0.4375em solid transparent;\n}\n[_nghost-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 0.5% 0 1.5% 0;\n  width: 100%;\n  max-width: 100%;\n}\ndiv[_ngcontent-%COMP%] {\n  height: 3vh;\n  flex-grow: 0.7;\n  margin: auto;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: space-evenly;\n  background: lightgray;\n}\ndiv.colored[_ngcontent-%COMP%] {\n  background: linear-gradient(90deg, #dfdef7ff, #c8d5f2ff, #b1ccedff, #a1d6c6ff, #90e09fff, #d6cd5fff, #d8ab56ff, #e1813fff, #e95727ff, #ff401fff);\n}\nspan[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  flex-basis: 0;\n  text-align: center;\n  font-size: 1vw;\n  padding-top: 1px;\n}\nspan.invisible[_ngcontent-%COMP%] {\n  color: transparent;\n}\nspan#last-one[_ngcontent-%COMP%] {\n  padding-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHN0eWxlcy5zY3NzIiwiY29sb3ItbGVnZW5kLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhFQUFBO0FBRUE7RUFDSSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0FDQUo7QURHQTtFQUNJLFNBQUE7RUFDQSxpREFBQTtBQ0FKO0FER0E7RUFDSSxlQUFBO0FDQUo7QURHQTtFQUNJO0lBQ0Usb0RBQUE7RUNBSjtBQUNGO0FESUEsbUNBQUE7QUFVQSxhQUFBO0FBWUEsYUFBQTtBQVlBLGFBQUE7QUFZQSxrQkFBQTtBQVlBLDZCQUFBO0FBRUE7O0VBRUUsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLHVCQUFBO0FDeERGO0FEMkRBO0VBQ0UsNEJBQUE7QUN4REY7QUQyREE7RUFDSSxnQkFBQTtFQUNBLHVCQUFBO0FDeERKO0FEMkRBLG1DQUFBO0FBQ0E7RUFDSSxZQUFBO0VBQ0EscURBQUE7QUN4REo7QUQwREk7RUFDSSxZQUFBO0FDeERSO0FENERBO0VBQ0ksWUFBQTtFQUNBLG9DQUFBO0FDekRKO0FEMkRJO0VBQ0ksWUFBQTtBQ3pEUjtBRDhEQSxzQ0FBQTtBQUdJO0VBQ0kscUJBQUE7RUFDQSxzQkFBQTtFQUNBLDhCQUFBO0VBQUEsMkJBQUE7RUFBQSxzQkFBQTtFQUNBLGNBQUE7QUM3RFI7QURrRUEsZ0NBQUE7QUFFQTtFQUNJO0lBQ0kscUJBQUE7RUNoRU47QUFDRjtBRG9FQSxtQ0FBQTtBQUdJO0VBQ0ksY0FBQTtBQ3BFUjtBRHlFQSxnQ0FBQTtBQUVBO0VBQ0k7SUFDSSxxQkFBQTtFQ3ZFTjtBQUNGO0FEMEVBO0VBQ0k7SUFDSSxnQ0FBQTtFQ3hFTjtBQUNGO0FENEVBLHVDQUFBO0FBR0k7RUFDSSxzQ0FBQTtBQzVFUjtBQWhHQTtFQUNJLGFBQUE7RUFDQSx1QkFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUFtR0o7QUFoR0E7RUFDSSxXQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLDZCQUFBO0VBQ0EscUJBQUE7QUFtR0o7QUEvRkE7RUFDSSxnSkRvRGE7QUM4Q2pCO0FBL0ZBO0VBQ0ksWUFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQWtHSjtBQS9GQTtFQUNJLGtCQUFBO0FBa0dKO0FBL0ZBO0VBQ0ksa0JBQUE7QUFrR0oiLCJmaWxlIjoiY29sb3ItbGVnZW5kLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogWW91IGNhbiBhZGQgZ2xvYmFsIHN0eWxlcyB0byB0aGlzIGZpbGUsIGFuZCBhbHNvIGltcG9ydCBvdGhlciBzdHlsZSBmaWxlcyAqL1xyXG5cclxuaHRtbCwgYm9keSB7IFxyXG4gICAgaGVpZ2h0OiAxMDAlOyBcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbmJvZHkgeyBcclxuICAgIG1hcmdpbjogMDsgXHJcbiAgICBmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7IFxyXG59XHJcblxyXG5odG1sIHtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTgwMHB4KSB7XHJcbiAgICBodG1sIHtcclxuICAgICAgZm9udC1zaXplOiBjYWxjKDEzcHggKyA2ICogKCgxMDB2dyAtIDE4MDBweCkgLyA0MDApKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKioqKioqIENPTE9SIFBBTEVUVEUgKioqKioqKioqKioqL1xyXG5cclxuJHByaW1hcnk6IHJnYig2MyA4MSAxODEpO1xyXG4kZ3JlZW4tY29ycmVjdC10ZXh0OiByZ2JhKDMwLCAxNTUsIDUzKTtcclxuJGdyZWVuLWNvcnJlY3QtYmFja2dyb3VuZDogcmdiKDEyOCwgMjQwLCAxNzkpO1xyXG4kcmVkLWVycm9yLXRleHQ6IHJnYigxNzksIDYsIDYpO1xyXG4kcmVkLWVycm9yLWJhY2tncm91bmQ6IHJnYigyNDAsIDEzMywgMTMzKTtcclxuJGdyZXktYmFja2dyb3VuZDogcmdiKDI0MCwgMjM5LCAyMzksIDEpO1xyXG4kZ3JleS1ib3JkZXI6cmdiYSgxODcsIDE4MywgMTgzLCAwLjkpO1xyXG5cclxuLyogU0NTUyBIRVggKi9cclxuJGxhdmVuZGVyLXdlYjogICAgICAgI2RmZGVmN2ZmO1xyXG4kcGVyaXdpbmtsZS1jcmF5b2xhOiAjYzhkNWYyZmY7XHJcbiRsaWdodC1zdGVlbC1ibHVlOiAgICNiMWNjZWRmZjtcclxuJG1pZGRsZS1ibHVlLWdyZWVuOiAgI2ExZDZjNmZmO1xyXG4kZ3Jhbm55LXNtaXRoLWFwcGxlOiAjOTBlMDlmZmY7XHJcbiRzdHJhdzogICAgICAgICAgICAgICNkNmNkNWZmZjtcclxuJHN1bnJheTogICAgICAgICAgICAgI2Q4YWI1NmZmO1xyXG4kcmF3LXNpZW5uYTogICAgICAgICAjZTE4MTNmZmY7XHJcbiRmbGFtZTogICAgICAgICAgICAgICNlOTU3MjdmZjtcclxuJHJlZC1yeWI6ICAgICAgICAgICAgI2ZmNDAxZmZmO1xyXG5cclxuLyogU0NTUyBIU0wgKi9cclxuJGxhdmVuZGVyLXdlYjogaHNsYSgyNDIsIDYxJSwgOTIlLCAxKTtcclxuJHBlcml3aW5rbGUtY3JheW9sYTogaHNsYSgyMjEsIDYyJSwgODclLCAxKTtcclxuJGxpZ2h0LXN0ZWVsLWJsdWU6IGhzbGEoMjEzLCA2MyUsIDgxJSwgMSk7XHJcbiRtaWRkbGUtYmx1ZS1ncmVlbjogaHNsYSgxNjIsIDM5JSwgNzQlLCAxKTtcclxuJGdyYW5ueS1zbWl0aC1hcHBsZTogaHNsYSgxMzEsIDU2JSwgNzIlLCAxKTtcclxuJHN0cmF3OiBoc2xhKDU1LCA1OSUsIDYxJSwgMSk7XHJcbiRzdW5yYXk6IGhzbGEoMzksIDYzJSwgNTklLCAxKTtcclxuJHJhdy1zaWVubmE6IGhzbGEoMjQsIDczJSwgNTYlLCAxKTtcclxuJGZsYW1lOiBoc2xhKDE1LCA4MiUsIDUzJSwgMSk7XHJcbiRyZWQtcnliOiBoc2xhKDksIDEwMCUsIDU2JSwgMSk7XHJcblxyXG4vKiBTQ1NTIFJHQiAqL1xyXG4kbGF2ZW5kZXItd2ViOiByZ2JhKDIyMywgMjIyLCAyNDcsIDEpO1xyXG4kcGVyaXdpbmtsZS1jcmF5b2xhOiByZ2JhKDIwMCwgMjEzLCAyNDIsIDEpO1xyXG4kbGlnaHQtc3RlZWwtYmx1ZTogcmdiYSgxNzcsIDIwNCwgMjM3LCAxKTtcclxuJG1pZGRsZS1ibHVlLWdyZWVuOiByZ2JhKDE2MSwgMjE0LCAxOTgsIDEpO1xyXG4kZ3Jhbm55LXNtaXRoLWFwcGxlOiByZ2JhKDE0NCwgMjI0LCAxNTksIDEpO1xyXG4kc3RyYXc6IHJnYmEoMjE0LCAyMDUsIDk1LCAxKTtcclxuJHN1bnJheTogcmdiYSgyMTYsIDE3MSwgODYsIDEpO1xyXG4kcmF3LXNpZW5uYTogcmdiYSgyMjUsIDEyOSwgNjMsIDEpO1xyXG4kZmxhbWU6IHJnYmEoMjMzLCA4NywgMzksIDEpO1xyXG4kcmVkLXJ5YjogcmdiYSgyNTUsIDY0LCAzMSwgMSk7XHJcblxyXG4vKiBTQ1NTIEdyYWRpZW50ICovXHJcbiRncmFkaWVudC10b3A6IGxpbmVhci1ncmFkaWVudCgwZGVnLCAjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG4kZ3JhZGllbnQtcmlnaHQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LWJvdHRvbTogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LWxlZnQ6IGxpbmVhci1ncmFkaWVudCgyNzBkZWcsICNkZmRlZjdmZiwgI2M4ZDVmMmZmLCAjYjFjY2VkZmYsICNhMWQ2YzZmZiwgIzkwZTA5ZmZmLCAjZDZjZDVmZmYsICNkOGFiNTZmZiwgI2UxODEzZmZmLCAjZTk1NzI3ZmYsICNmZjQwMWZmZik7XHJcbiRncmFkaWVudC10b3AtcmlnaHQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LWJvdHRvbS1yaWdodDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LXRvcC1sZWZ0OiBsaW5lYXItZ3JhZGllbnQoMjI1ZGVnLCAjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG4kZ3JhZGllbnQtYm90dG9tLWxlZnQ6IGxpbmVhci1ncmFkaWVudCgzMTVkZWcsICNkZmRlZjdmZiwgI2M4ZDVmMmZmLCAjYjFjY2VkZmYsICNhMWQ2YzZmZiwgIzkwZTA5ZmZmLCAjZDZjZDVmZmYsICNkOGFiNTZmZiwgI2UxODEzZmZmLCAjZTk1NzI3ZmYsICNmZjQwMWZmZik7XHJcbiRncmFkaWVudC1yYWRpYWw6IHJhZGlhbC1ncmFkaWVudCgjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG5cclxuXHJcbi8qKioqKioqIFNDUk9MTEJBUiAqKioqKioqKioqL1xyXG5cclxuKjo6LXdlYmtpdC1zY3JvbGxiYXIsXHJcbio6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICB3aWR0aDogMTVweDtcclxuICBib3JkZXItcmFkaXVzOiAxM3B4O1xyXG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XHJcbiAgYm9yZGVyOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbio6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHsgICAgICAgIFxyXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDEwcHg7XHJcbn1cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4vKioqKioqKioqIE5PVElGSUNBVElPTlMgKioqKioqKioqKi9cclxuLnN1Y2Nlc3Mge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzMCwgMTU1LCA1MywgMC42NzEpIWltcG9ydGFudDtcclxuXHJcbiAgICAubWF0LWJ1dHRvbi13cmFwcGVyIHtcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5lcnJvciB7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTk2LCA1MiwgNCkhaW1wb3J0YW50O1xyXG5cclxuICAgIC5tYXQtYnV0dG9uLXdyYXBwZXIge1xyXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKioqKioqKioqKiBCVVRUT05TICoqKioqKioqKioqKioqKioqL1xyXG5cclxuOjpuZy1kZWVwIHtcclxuICAgIC5tYXQtc3Ryb2tlZC1idXR0b24ge1xyXG4gICAgICAgIHdpZHRoOiA0dnchaW1wb3J0YW50O1xyXG4gICAgICAgIGhlaWdodDogNHZoIWltcG9ydGFudDtcclxuICAgICAgICBtaW4td2lkdGg6Zml0LWNvbnRlbnQ7XHJcbiAgICAgICAgZm9udC1zaXplOiAxZW07XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKioqKioqKioqKiBUT0dMRVMgKioqKioqKioqKioqKi9cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDIwMDBweCkge1xyXG4gICAgLm1hdC1zbGlkZS10b2dnbGUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcclxuICAgIH0gICAgXHJcbn1cclxuXHJcblxyXG4vKioqKioqKioqIFNMSURFUlMgKioqKioqKioqKioqKioqKi9cclxuXHJcbjo6bmctZGVlcCB7XHJcbiAgICAubWF0LXNsaWRlci1ob3Jpem9udGFsIHtcclxuICAgICAgICBtaW4td2lkdGg6IDh2dztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKioqKioqKiogQ0hFQ0tCT1ggKioqKioqKioqKioqL1xyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMjAwMHB4KSB7XHJcbiAgICAubWF0LWNoZWNrYm94LWlubmVyLWNvbnRhaW5lciB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xyXG4gICAgfSAgICBcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMjAwMHB4KSB7XHJcbiAgICAubWF0LXNuYWNrLWJhci1jb250YWluZXIge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KSFpbXBvcnRhbnQ7XHJcbiAgICB9ICAgIFxyXG59XHJcblxyXG5cclxuLyoqKioqKioqKioqIElOUFVUIEZJRUxEUyAqKioqKioqKioqKioqL1xyXG5cclxuOjpuZy1kZWVwIHtcclxuICAgIC5tYXQtZm9ybS1maWVsZC1pbmZpeCB7XHJcbiAgICAgICAgYm9yZGVyLXRvcDogMC40Mzc1ZW0gc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICB9XHJcbn0iLCIvKiBZb3UgY2FuIGFkZCBnbG9iYWwgc3R5bGVzIHRvIHRoaXMgZmlsZSwgYW5kIGFsc28gaW1wb3J0IG90aGVyIHN0eWxlIGZpbGVzICovXG5odG1sLCBib2R5IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbmJvZHkge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbn1cblxuaHRtbCB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTgwMHB4KSB7XG4gIGh0bWwge1xuICAgIGZvbnQtc2l6ZTogY2FsYygxM3B4ICsgNiAqICgoMTAwdncgLSAxODAwcHgpIC8gNDAwKSk7XG4gIH1cbn1cbi8qKioqKioqIENPTE9SIFBBTEVUVEUgKioqKioqKioqKioqL1xuLyogU0NTUyBIRVggKi9cbi8qIFNDU1MgSFNMICovXG4vKiBTQ1NTIFJHQiAqL1xuLyogU0NTUyBHcmFkaWVudCAqL1xuLyoqKioqKiogU0NST0xMQkFSICoqKioqKioqKiovXG4qOjotd2Via2l0LXNjcm9sbGJhcixcbio6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgd2lkdGg6IDE1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDEzcHg7XG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gIGJvcmRlcjogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuKjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAxMHB4O1xufVxuXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi8qKioqKioqKiogTk9USUZJQ0FUSU9OUyAqKioqKioqKioqL1xuLnN1Y2Nlc3Mge1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzAsIDE1NSwgNTMsIDAuNjcxKSAhaW1wb3J0YW50O1xufVxuLnN1Y2Nlc3MgLm1hdC1idXR0b24td3JhcHBlciB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmVycm9yIHtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzQzNDA0ICFpbXBvcnRhbnQ7XG59XG4uZXJyb3IgLm1hdC1idXR0b24td3JhcHBlciB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLyoqKioqKioqKioqIEJVVFRPTlMgKioqKioqKioqKioqKioqKiovXG46Om5nLWRlZXAgLm1hdC1zdHJva2VkLWJ1dHRvbiB7XG4gIHdpZHRoOiA0dncgIWltcG9ydGFudDtcbiAgaGVpZ2h0OiA0dmggIWltcG9ydGFudDtcbiAgbWluLXdpZHRoOiBmaXQtY29udGVudDtcbiAgZm9udC1zaXplOiAxZW07XG59XG5cbi8qKioqKioqKioqIFRPR0xFUyAqKioqKioqKioqKioqL1xuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMjAwMHB4KSB7XG4gIC5tYXQtc2xpZGUtdG9nZ2xlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XG4gIH1cbn1cbi8qKioqKioqKiogU0xJREVSUyAqKioqKioqKioqKioqKioqL1xuOjpuZy1kZWVwIC5tYXQtc2xpZGVyLWhvcml6b250YWwge1xuICBtaW4td2lkdGg6IDh2dztcbn1cblxuLyoqKioqKioqKiBDSEVDS0JPWCAqKioqKioqKioqKiovXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAyMDAwcHgpIHtcbiAgLm1hdC1jaGVja2JveC1pbm5lci1jb250YWluZXIge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMjAwMHB4KSB7XG4gIC5tYXQtc25hY2stYmFyLWNvbnRhaW5lciB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpICFpbXBvcnRhbnQ7XG4gIH1cbn1cbi8qKioqKioqKioqKiBJTlBVVCBGSUVMRFMgKioqKioqKioqKioqKi9cbjo6bmctZGVlcCAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICBib3JkZXItdG9wOiAwLjQzNzVlbSBzb2xpZCB0cmFuc3BhcmVudDtcbn1cblxuOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcGFkZGluZzogMC41JSAwIDEuNSUgMDtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cblxuZGl2IHtcbiAgaGVpZ2h0OiAzdmg7XG4gIGZsZXgtZ3JvdzogMC43O1xuICBtYXJnaW46IGF1dG87XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXgtd3JhcDogbm93cmFwO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgYmFja2dyb3VuZDogbGlnaHRncmF5O1xufVxuXG5kaXYuY29sb3JlZCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcbn1cblxuc3BhbiB7XG4gIGZsZXgtZ3JvdzogMTtcbiAgZmxleC1iYXNpczogMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDF2dztcbiAgcGFkZGluZy10b3A6IDFweDtcbn1cblxuc3Bhbi5pbnZpc2libGUge1xuICBjb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbnNwYW4jbGFzdC1vbmUge1xuICBwYWRkaW5nLXJpZ2h0OiA1cHg7XG59Il19 */"] });


/***/ }),

/***/ 4984:
/*!***********************************************************!*\
  !*** ./src/app/components/data-tab/data-tab.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataTabComponent": () => (/* binding */ DataTabComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_facade_data_data_facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/facade/data/data.facade */ 1461);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/form-field */ 5788);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/select */ 7007);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4364);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/core */ 2220);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 781);







function DataTabComponent_mat_option_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const uid_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", uid_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", uid_r3, " ");
} }
function DataTabComponent_mat_option_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const docid_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", docid_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", docid_r4, " ");
} }
function DataTabComponent_button_14_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DataTabComponent_button_14_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r5.loadData(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r2.isLoadDisabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r2.isLoaded ? "Reload" : "Load", " ");
} }
class DataTabComponent {
    constructor(dataFacade) {
        this.dataFacade = dataFacade;
        this.userIds = [];
        this.documentIds = [];
        this.isUpdating = false;
        this.isLoaded = false;
        this.dataFacade.isUpdating$().subscribe((value) => { this.isUpdating = value; });
        this.dataFacade.getUserIds$().subscribe((data) => { this.userIds = data; });
        this.dataFacade.getDocumentIds$().subscribe((data) => { this.documentIds = data; });
        this.dataFacade.getDocument$().subscribe((document) => {
            this.document = document;
            this.selDocumentId = document.id;
            this.selUserId = document.userId;
            this.isLoaded = true;
        });
    }
    /** Load button is disabled */
    get isLoadDisabled() {
        return (this.selUserId === undefined) || (this.selDocumentId === undefined);
    }
    ngOnInit() {
    }
    /** Load document */
    loadData() {
        if (this.selUserId && this.selDocumentId) {
            this.dataFacade.loadDocument(this.selUserId, this.selDocumentId);
        }
    }
    /**
     * Checks whether the selected combination of user id + document id corresponds to the loaded document
     * and updates the corresponding variable if necessary.
     */
    dataSelectionChange() {
        if (this.document) {
            this.isLoaded = (this.document.id == this.selDocumentId) && (this.document.userId == this.selUserId);
        }
    }
}
DataTabComponent.ɵfac = function DataTabComponent_Factory(t) { return new (t || DataTabComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_facade_data_data_facade__WEBPACK_IMPORTED_MODULE_0__.DataFacade)); };
DataTabComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DataTabComponent, selectors: [["app-data-tab"]], decls: 16, vars: 5, consts: [["id", "input-container"], ["appearance", "fill"], [3, "value", "valueChange", "selectionChange"], [3, "value", 4, "ngFor", "ngForOf"], ["id", "buttons-container"], ["mat-flat-button", "", "color", "primary", "class", "my-button", 3, "disabled", "click", 4, "ngIf"], [3, "value"], ["mat-flat-button", "", "color", "primary", 1, "my-button", 3, "disabled", "click"]], template: function DataTabComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "User:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("valueChange", function DataTabComponent_Template_mat_select_valueChange_5_listener($event) { return ctx.selUserId = $event; })("selectionChange", function DataTabComponent_Template_mat_select_selectionChange_5_listener() { return ctx.dataSelectionChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, DataTabComponent_mat_option_6_Template, 2, 2, "mat-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Document:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "mat-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("valueChange", function DataTabComponent_Template_mat_select_valueChange_11_listener($event) { return ctx.selDocumentId = $event; })("selectionChange", function DataTabComponent_Template_mat_select_selectionChange_11_listener() { return ctx.dataSelectionChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, DataTabComponent_mat_option_12_Template, 2, 2, "mat-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "section", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, DataTabComponent_button_14_Template, 2, 2, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "section");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.selUserId);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.userIds);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.selDocumentId);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.documentIds);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isUpdating);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__.MatFormField, _angular_material_select__WEBPACK_IMPORTED_MODULE_3__.MatSelect, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  overflow: hidden;\n  margin-top: 2vh;\n  font-size: min(1.6vw, 1.6vh);\n}\n\nsection[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  display: flex;\n  align-items: baseline;\n  padding: 1vh 1vw 0 1vw;\n}\n\nsection#input-container[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  align-items: center;\n}\n\nsection#input-container[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  margin-left: 2vw;\n}\n\nsection#input-container[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  margin-left: 1vw;\n  font-size: 0.9em;\n}\n\n  .mat-form-field .mat-form-field-wrapper .mat-form-field-flex {\n  padding: 0 0.75em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEtdGFiLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLDRCQUFBO0FBQ0o7O0FBRUE7RUFDSSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7QUFDSjs7QUFFQTtFQUNJLGVBQUE7RUFDQSxtQkFBQTtBQUNKOztBQUVRO0VBQ0ksZ0JBQUE7QUFBWjs7QUFHUTtFQUNJLGdCQUFBO0VBQ0EsZ0JBQUE7QUFEWjs7QUFRUTtFQUNJLGlCQUFBO0FBTFoiLCJmaWxlIjoiZGF0YS10YWIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIG1hcmdpbi10b3A6IDJ2aDtcclxuICAgIGZvbnQtc2l6ZTogbWluKDEuNnZ3LCAxLjZ2aCk7XHJcbn1cclxuXHJcbnNlY3Rpb24ge1xyXG4gICAgZmxleC1ncm93OiAxO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcclxuICAgIHBhZGRpbmc6IDF2aCAxdncgMCAxdnc7IFxyXG59XHJcblxyXG5zZWN0aW9uI2lucHV0LWNvbnRhaW5lciB7XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgIGRpdiB7XHJcbiAgICAgICAgbGFiZWwge1xyXG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMnZ3O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWF0LWZvcm0tZmllbGQge1xyXG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMXZ3O1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDAuOWVtO1xyXG4gICAgICAgIH0gXHJcbiAgICB9ICBcclxufVxyXG5cclxuOjpuZy1kZWVwIC5tYXQtZm9ybS1maWVsZCB7XHJcbiAgICAubWF0LWZvcm0tZmllbGQtd3JhcHBlciB7XHJcbiAgICAgICAgLm1hdC1mb3JtLWZpZWxkLWZsZXgge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAwIC43NWVtOyAgICAgIFxyXG4gICAgICAgIH0gICAgICAgICAgICBcclxuICAgIH1cclxufSJdfQ== */"] });


/***/ }),

/***/ 4733:
/*!***************************************************************************!*\
  !*** ./src/app/components/document-details/document-details.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentDetailsComponent": () => (/* binding */ DocumentDetailsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_facade_data_data_facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/facade/data/data.facade */ 1461);


class DocumentDetailsComponent {
    constructor(dataFacade) {
        this.dataFacade = dataFacade;
        this.userId = "";
        this.docId = "";
        this.query = "";
        this.dataFacade.getDocument$().subscribe((document) => {
            this.userId = document.userId;
            this.docId = document.id;
            this.query = document.query;
        });
    }
    ngOnInit() {
    }
}
DocumentDetailsComponent.ɵfac = function DocumentDetailsComponent_Factory(t) { return new (t || DocumentDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_facade_data_data_facade__WEBPACK_IMPORTED_MODULE_0__.DataFacade)); };
DocumentDetailsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DocumentDetailsComponent, selectors: [["app-document-details"]], decls: 15, vars: 3, consts: [["id", "query"]], template: function DocumentDetailsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "User:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Document:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Query:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.userId);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.docId);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\"", ctx.query, "\"");
    } }, styles: ["html[_ngcontent-%COMP%], body[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  max-width: 100%;\n  padding: 0;\n  margin: 0;\n  overflow: hidden;\n}\nbody[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\nhtml[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n@media screen and (min-width: 1800px) {\n  html[_ngcontent-%COMP%] {\n    font-size: calc(13px + 6 * ((100vw - 1800px) / 400));\n  }\n}\n\n\n\n\n\n\n*[_ngcontent-%COMP%]::-webkit-scrollbar, *[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  width: 15px;\n  border-radius: 13px;\n  background-clip: padding-box;\n  border: 5px solid transparent;\n  background-color: white;\n}\n*[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  box-shadow: inset 0 0 0 10px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  box-shadow: none;\n  background-color: white;\n}\n\n.success[_ngcontent-%COMP%] {\n  color: white;\n  background-color: rgba(30, 155, 53, 0.671) !important;\n}\n.success[_ngcontent-%COMP%]   .mat-button-wrapper[_ngcontent-%COMP%] {\n  color: white;\n}\n.error[_ngcontent-%COMP%] {\n  color: white;\n  background-color: #c43404 !important;\n}\n.error[_ngcontent-%COMP%]   .mat-button-wrapper[_ngcontent-%COMP%] {\n  color: white;\n}\n\n  .mat-stroked-button {\n  width: 4vw !important;\n  height: 4vh !important;\n  min-width: -webkit-fit-content;\n  min-width: -moz-fit-content;\n  min-width: fit-content;\n  font-size: 1em;\n}\n\n@media screen and (min-width: 2000px) {\n  .mat-slide-toggle[_ngcontent-%COMP%] {\n    transform: scale(1.4);\n  }\n}\n\n  .mat-slider-horizontal {\n  min-width: 8vw;\n}\n\n@media screen and (min-width: 2000px) {\n  .mat-checkbox-inner-container[_ngcontent-%COMP%] {\n    transform: scale(1.4);\n  }\n}\n@media screen and (min-width: 2000px) {\n  .mat-snack-bar-container[_ngcontent-%COMP%] {\n    transform: scale(1.4) !important;\n  }\n}\n\n  .mat-form-field-infix {\n  border-top: 0.4375em solid transparent;\n}\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  padding: 0.5% 1% 1% 1%;\n  width: 100%;\n  max-width: 100%;\n}\n[_nghost-%COMP%]   div[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n}\n[_nghost-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) {\n  font-weight: 500;\n  padding: 0.5vh 1vw;\n  text-align: center;\n}\n[_nghost-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n  padding: 0.5vh 1vw;\n  background-color: #f0efef;\n  border: 1px solid rgba(187, 183, 183, 0.9);\n  border-radius: 12px;\n}\n[_nghost-%COMP%]   div#query[_ngcontent-%COMP%] {\n  flex-grow: 4;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHN0eWxlcy5zY3NzIiwiZG9jdW1lbnQtZGV0YWlscy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4RUFBQTtBQUVBO0VBQ0ksWUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtBQ0FKO0FER0E7RUFDSSxTQUFBO0VBQ0EsaURBQUE7QUNBSjtBREdBO0VBQ0ksZUFBQTtBQ0FKO0FER0E7RUFDSTtJQUNFLG9EQUFBO0VDQUo7QUFDRjtBRElBLG1DQUFBO0FBVUEsYUFBQTtBQVlBLGFBQUE7QUFZQSxhQUFBO0FBWUEsa0JBQUE7QUFZQSw2QkFBQTtBQUVBOztFQUVFLFdBQUE7RUFDQSxtQkFBQTtFQUNBLDRCQUFBO0VBQ0EsNkJBQUE7RUFDQSx1QkFBQTtBQ3hERjtBRDJEQTtFQUNFLDRCQUFBO0FDeERGO0FEMkRBO0VBQ0ksZ0JBQUE7RUFDQSx1QkFBQTtBQ3hESjtBRDJEQSxtQ0FBQTtBQUNBO0VBQ0ksWUFBQTtFQUNBLHFEQUFBO0FDeERKO0FEMERJO0VBQ0ksWUFBQTtBQ3hEUjtBRDREQTtFQUNJLFlBQUE7RUFDQSxvQ0FBQTtBQ3pESjtBRDJESTtFQUNJLFlBQUE7QUN6RFI7QUQ4REEsc0NBQUE7QUFHSTtFQUNJLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSw4QkFBQTtFQUFBLDJCQUFBO0VBQUEsc0JBQUE7RUFDQSxjQUFBO0FDN0RSO0FEa0VBLGdDQUFBO0FBRUE7RUFDSTtJQUNJLHFCQUFBO0VDaEVOO0FBQ0Y7QURvRUEsbUNBQUE7QUFHSTtFQUNJLGNBQUE7QUNwRVI7QUR5RUEsZ0NBQUE7QUFFQTtFQUNJO0lBQ0kscUJBQUE7RUN2RU47QUFDRjtBRDBFQTtFQUNJO0lBQ0ksZ0NBQUE7RUN4RU47QUFDRjtBRDRFQSx1Q0FBQTtBQUdJO0VBQ0ksc0NBQUE7QUM1RVI7QUFoR0E7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUFtR0o7QUFqR0k7RUFDSSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtBQW1HUjtBQWpHUTtFQUNJLGdCQUFBO0VBRUEsa0JBQUE7RUFDQSxrQkFBQTtBQWtHWjtBQS9GUTtFQUNJLGtCQUFBO0VBQ0EseUJEU007RUNSTiwwQ0FBQTtFQUNBLG1CQUFBO0FBaUdaO0FBN0ZJO0VBQ0ksWUFBQTtBQStGUiIsImZpbGUiOiJkb2N1bWVudC1kZXRhaWxzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogWW91IGNhbiBhZGQgZ2xvYmFsIHN0eWxlcyB0byB0aGlzIGZpbGUsIGFuZCBhbHNvIGltcG9ydCBvdGhlciBzdHlsZSBmaWxlcyAqL1xyXG5cclxuaHRtbCwgYm9keSB7IFxyXG4gICAgaGVpZ2h0OiAxMDAlOyBcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbmJvZHkgeyBcclxuICAgIG1hcmdpbjogMDsgXHJcbiAgICBmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7IFxyXG59XHJcblxyXG5odG1sIHtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTgwMHB4KSB7XHJcbiAgICBodG1sIHtcclxuICAgICAgZm9udC1zaXplOiBjYWxjKDEzcHggKyA2ICogKCgxMDB2dyAtIDE4MDBweCkgLyA0MDApKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKioqKioqIENPTE9SIFBBTEVUVEUgKioqKioqKioqKioqL1xyXG5cclxuJHByaW1hcnk6IHJnYig2MyA4MSAxODEpO1xyXG4kZ3JlZW4tY29ycmVjdC10ZXh0OiByZ2JhKDMwLCAxNTUsIDUzKTtcclxuJGdyZWVuLWNvcnJlY3QtYmFja2dyb3VuZDogcmdiKDEyOCwgMjQwLCAxNzkpO1xyXG4kcmVkLWVycm9yLXRleHQ6IHJnYigxNzksIDYsIDYpO1xyXG4kcmVkLWVycm9yLWJhY2tncm91bmQ6IHJnYigyNDAsIDEzMywgMTMzKTtcclxuJGdyZXktYmFja2dyb3VuZDogcmdiKDI0MCwgMjM5LCAyMzksIDEpO1xyXG4kZ3JleS1ib3JkZXI6cmdiYSgxODcsIDE4MywgMTgzLCAwLjkpO1xyXG5cclxuLyogU0NTUyBIRVggKi9cclxuJGxhdmVuZGVyLXdlYjogICAgICAgI2RmZGVmN2ZmO1xyXG4kcGVyaXdpbmtsZS1jcmF5b2xhOiAjYzhkNWYyZmY7XHJcbiRsaWdodC1zdGVlbC1ibHVlOiAgICNiMWNjZWRmZjtcclxuJG1pZGRsZS1ibHVlLWdyZWVuOiAgI2ExZDZjNmZmO1xyXG4kZ3Jhbm55LXNtaXRoLWFwcGxlOiAjOTBlMDlmZmY7XHJcbiRzdHJhdzogICAgICAgICAgICAgICNkNmNkNWZmZjtcclxuJHN1bnJheTogICAgICAgICAgICAgI2Q4YWI1NmZmO1xyXG4kcmF3LXNpZW5uYTogICAgICAgICAjZTE4MTNmZmY7XHJcbiRmbGFtZTogICAgICAgICAgICAgICNlOTU3MjdmZjtcclxuJHJlZC1yeWI6ICAgICAgICAgICAgI2ZmNDAxZmZmO1xyXG5cclxuLyogU0NTUyBIU0wgKi9cclxuJGxhdmVuZGVyLXdlYjogaHNsYSgyNDIsIDYxJSwgOTIlLCAxKTtcclxuJHBlcml3aW5rbGUtY3JheW9sYTogaHNsYSgyMjEsIDYyJSwgODclLCAxKTtcclxuJGxpZ2h0LXN0ZWVsLWJsdWU6IGhzbGEoMjEzLCA2MyUsIDgxJSwgMSk7XHJcbiRtaWRkbGUtYmx1ZS1ncmVlbjogaHNsYSgxNjIsIDM5JSwgNzQlLCAxKTtcclxuJGdyYW5ueS1zbWl0aC1hcHBsZTogaHNsYSgxMzEsIDU2JSwgNzIlLCAxKTtcclxuJHN0cmF3OiBoc2xhKDU1LCA1OSUsIDYxJSwgMSk7XHJcbiRzdW5yYXk6IGhzbGEoMzksIDYzJSwgNTklLCAxKTtcclxuJHJhdy1zaWVubmE6IGhzbGEoMjQsIDczJSwgNTYlLCAxKTtcclxuJGZsYW1lOiBoc2xhKDE1LCA4MiUsIDUzJSwgMSk7XHJcbiRyZWQtcnliOiBoc2xhKDksIDEwMCUsIDU2JSwgMSk7XHJcblxyXG4vKiBTQ1NTIFJHQiAqL1xyXG4kbGF2ZW5kZXItd2ViOiByZ2JhKDIyMywgMjIyLCAyNDcsIDEpO1xyXG4kcGVyaXdpbmtsZS1jcmF5b2xhOiByZ2JhKDIwMCwgMjEzLCAyNDIsIDEpO1xyXG4kbGlnaHQtc3RlZWwtYmx1ZTogcmdiYSgxNzcsIDIwNCwgMjM3LCAxKTtcclxuJG1pZGRsZS1ibHVlLWdyZWVuOiByZ2JhKDE2MSwgMjE0LCAxOTgsIDEpO1xyXG4kZ3Jhbm55LXNtaXRoLWFwcGxlOiByZ2JhKDE0NCwgMjI0LCAxNTksIDEpO1xyXG4kc3RyYXc6IHJnYmEoMjE0LCAyMDUsIDk1LCAxKTtcclxuJHN1bnJheTogcmdiYSgyMTYsIDE3MSwgODYsIDEpO1xyXG4kcmF3LXNpZW5uYTogcmdiYSgyMjUsIDEyOSwgNjMsIDEpO1xyXG4kZmxhbWU6IHJnYmEoMjMzLCA4NywgMzksIDEpO1xyXG4kcmVkLXJ5YjogcmdiYSgyNTUsIDY0LCAzMSwgMSk7XHJcblxyXG4vKiBTQ1NTIEdyYWRpZW50ICovXHJcbiRncmFkaWVudC10b3A6IGxpbmVhci1ncmFkaWVudCgwZGVnLCAjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG4kZ3JhZGllbnQtcmlnaHQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LWJvdHRvbTogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LWxlZnQ6IGxpbmVhci1ncmFkaWVudCgyNzBkZWcsICNkZmRlZjdmZiwgI2M4ZDVmMmZmLCAjYjFjY2VkZmYsICNhMWQ2YzZmZiwgIzkwZTA5ZmZmLCAjZDZjZDVmZmYsICNkOGFiNTZmZiwgI2UxODEzZmZmLCAjZTk1NzI3ZmYsICNmZjQwMWZmZik7XHJcbiRncmFkaWVudC10b3AtcmlnaHQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LWJvdHRvbS1yaWdodDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LXRvcC1sZWZ0OiBsaW5lYXItZ3JhZGllbnQoMjI1ZGVnLCAjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG4kZ3JhZGllbnQtYm90dG9tLWxlZnQ6IGxpbmVhci1ncmFkaWVudCgzMTVkZWcsICNkZmRlZjdmZiwgI2M4ZDVmMmZmLCAjYjFjY2VkZmYsICNhMWQ2YzZmZiwgIzkwZTA5ZmZmLCAjZDZjZDVmZmYsICNkOGFiNTZmZiwgI2UxODEzZmZmLCAjZTk1NzI3ZmYsICNmZjQwMWZmZik7XHJcbiRncmFkaWVudC1yYWRpYWw6IHJhZGlhbC1ncmFkaWVudCgjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG5cclxuXHJcbi8qKioqKioqIFNDUk9MTEJBUiAqKioqKioqKioqL1xyXG5cclxuKjo6LXdlYmtpdC1zY3JvbGxiYXIsXHJcbio6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICB3aWR0aDogMTVweDtcclxuICBib3JkZXItcmFkaXVzOiAxM3B4O1xyXG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XHJcbiAgYm9yZGVyOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbio6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHsgICAgICAgIFxyXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDEwcHg7XHJcbn1cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4vKioqKioqKioqIE5PVElGSUNBVElPTlMgKioqKioqKioqKi9cclxuLnN1Y2Nlc3Mge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzMCwgMTU1LCA1MywgMC42NzEpIWltcG9ydGFudDtcclxuXHJcbiAgICAubWF0LWJ1dHRvbi13cmFwcGVyIHtcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5lcnJvciB7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTk2LCA1MiwgNCkhaW1wb3J0YW50O1xyXG5cclxuICAgIC5tYXQtYnV0dG9uLXdyYXBwZXIge1xyXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKioqKioqKioqKiBCVVRUT05TICoqKioqKioqKioqKioqKioqL1xyXG5cclxuOjpuZy1kZWVwIHtcclxuICAgIC5tYXQtc3Ryb2tlZC1idXR0b24ge1xyXG4gICAgICAgIHdpZHRoOiA0dnchaW1wb3J0YW50O1xyXG4gICAgICAgIGhlaWdodDogNHZoIWltcG9ydGFudDtcclxuICAgICAgICBtaW4td2lkdGg6Zml0LWNvbnRlbnQ7XHJcbiAgICAgICAgZm9udC1zaXplOiAxZW07XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKioqKioqKioqKiBUT0dMRVMgKioqKioqKioqKioqKi9cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDIwMDBweCkge1xyXG4gICAgLm1hdC1zbGlkZS10b2dnbGUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcclxuICAgIH0gICAgXHJcbn1cclxuXHJcblxyXG4vKioqKioqKioqIFNMSURFUlMgKioqKioqKioqKioqKioqKi9cclxuXHJcbjo6bmctZGVlcCB7XHJcbiAgICAubWF0LXNsaWRlci1ob3Jpem9udGFsIHtcclxuICAgICAgICBtaW4td2lkdGg6IDh2dztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKioqKioqKiogQ0hFQ0tCT1ggKioqKioqKioqKioqL1xyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMjAwMHB4KSB7XHJcbiAgICAubWF0LWNoZWNrYm94LWlubmVyLWNvbnRhaW5lciB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xyXG4gICAgfSAgICBcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMjAwMHB4KSB7XHJcbiAgICAubWF0LXNuYWNrLWJhci1jb250YWluZXIge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KSFpbXBvcnRhbnQ7XHJcbiAgICB9ICAgIFxyXG59XHJcblxyXG5cclxuLyoqKioqKioqKioqIElOUFVUIEZJRUxEUyAqKioqKioqKioqKioqL1xyXG5cclxuOjpuZy1kZWVwIHtcclxuICAgIC5tYXQtZm9ybS1maWVsZC1pbmZpeCB7XHJcbiAgICAgICAgYm9yZGVyLXRvcDogMC40Mzc1ZW0gc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICB9XHJcbn0iLCIvKiBZb3UgY2FuIGFkZCBnbG9iYWwgc3R5bGVzIHRvIHRoaXMgZmlsZSwgYW5kIGFsc28gaW1wb3J0IG90aGVyIHN0eWxlIGZpbGVzICovXG5odG1sLCBib2R5IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbmJvZHkge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbn1cblxuaHRtbCB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTgwMHB4KSB7XG4gIGh0bWwge1xuICAgIGZvbnQtc2l6ZTogY2FsYygxM3B4ICsgNiAqICgoMTAwdncgLSAxODAwcHgpIC8gNDAwKSk7XG4gIH1cbn1cbi8qKioqKioqIENPTE9SIFBBTEVUVEUgKioqKioqKioqKioqL1xuLyogU0NTUyBIRVggKi9cbi8qIFNDU1MgSFNMICovXG4vKiBTQ1NTIFJHQiAqL1xuLyogU0NTUyBHcmFkaWVudCAqL1xuLyoqKioqKiogU0NST0xMQkFSICoqKioqKioqKiovXG4qOjotd2Via2l0LXNjcm9sbGJhcixcbio6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgd2lkdGg6IDE1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDEzcHg7XG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gIGJvcmRlcjogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuKjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAxMHB4O1xufVxuXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi8qKioqKioqKiogTk9USUZJQ0FUSU9OUyAqKioqKioqKioqL1xuLnN1Y2Nlc3Mge1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzAsIDE1NSwgNTMsIDAuNjcxKSAhaW1wb3J0YW50O1xufVxuLnN1Y2Nlc3MgLm1hdC1idXR0b24td3JhcHBlciB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmVycm9yIHtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzQzNDA0ICFpbXBvcnRhbnQ7XG59XG4uZXJyb3IgLm1hdC1idXR0b24td3JhcHBlciB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLyoqKioqKioqKioqIEJVVFRPTlMgKioqKioqKioqKioqKioqKiovXG46Om5nLWRlZXAgLm1hdC1zdHJva2VkLWJ1dHRvbiB7XG4gIHdpZHRoOiA0dncgIWltcG9ydGFudDtcbiAgaGVpZ2h0OiA0dmggIWltcG9ydGFudDtcbiAgbWluLXdpZHRoOiBmaXQtY29udGVudDtcbiAgZm9udC1zaXplOiAxZW07XG59XG5cbi8qKioqKioqKioqIFRPR0xFUyAqKioqKioqKioqKioqL1xuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMjAwMHB4KSB7XG4gIC5tYXQtc2xpZGUtdG9nZ2xlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XG4gIH1cbn1cbi8qKioqKioqKiogU0xJREVSUyAqKioqKioqKioqKioqKioqL1xuOjpuZy1kZWVwIC5tYXQtc2xpZGVyLWhvcml6b250YWwge1xuICBtaW4td2lkdGg6IDh2dztcbn1cblxuLyoqKioqKioqKiBDSEVDS0JPWCAqKioqKioqKioqKiovXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAyMDAwcHgpIHtcbiAgLm1hdC1jaGVja2JveC1pbm5lci1jb250YWluZXIge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMjAwMHB4KSB7XG4gIC5tYXQtc25hY2stYmFyLWNvbnRhaW5lciB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpICFpbXBvcnRhbnQ7XG4gIH1cbn1cbi8qKioqKioqKioqKiBJTlBVVCBGSUVMRFMgKioqKioqKioqKioqKi9cbjo6bmctZGVlcCAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICBib3JkZXItdG9wOiAwLjQzNzVlbSBzb2xpZCB0cmFuc3BhcmVudDtcbn1cblxuOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbGV4LXdyYXA6IG5vd3JhcDtcbiAgcGFkZGluZzogMC41JSAxJSAxJSAxJTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogMTAwJTtcbn1cbjpob3N0IGRpdiB7XG4gIGZsZXgtZ3JvdzogMTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuOmhvc3QgZGl2IHNwYW46bnRoLWNoaWxkKDEpIHtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgcGFkZGluZzogMC41dmggMXZ3O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG46aG9zdCBkaXYgc3BhbjpudGgtY2hpbGQoMikge1xuICBwYWRkaW5nOiAwLjV2aCAxdnc7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmMGVmZWY7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMTg3LCAxODMsIDE4MywgMC45KTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbn1cbjpob3N0IGRpdiNxdWVyeSB7XG4gIGZsZXgtZ3JvdzogNDtcbn0iXX0= */"] });


/***/ }),

/***/ 7053:
/*!***********************************************************!*\
  !*** ./src/app/components/document/document.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentComponent": () => (/* binding */ DocumentComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_facade_data_data_facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/facade/data/data.facade */ 1461);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4364);
/* harmony import */ var _paragraph_paragraph_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../paragraph/paragraph.component */ 3343);




function DocumentComponent_div_0_app_paragraph_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-paragraph", 4);
} if (rf & 2) {
    const par_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("paragraph", par_r4);
} }
function DocumentComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, DocumentComponent_div_0_app_paragraph_1_Template, 1, 1, "app-paragraph", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r0.document.paragraphs);
} }
function DocumentComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Select a document to load ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
class DocumentComponent {
    constructor(dataFacade) {
        this.dataFacade = dataFacade;
        this.dataFacade.getDocument$().subscribe((doc) => { this.document = doc; });
    }
    ngOnInit() {
    }
}
DocumentComponent.ɵfac = function DocumentComponent_Factory(t) { return new (t || DocumentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_facade_data_data_facade__WEBPACK_IMPORTED_MODULE_0__.DataFacade)); };
DocumentComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: DocumentComponent, selectors: [["app-document"]], decls: 3, vars: 2, consts: [["id", "content", 4, "ngIf", "ngIfElse"], ["notDocument", ""], ["id", "content"], [3, "paragraph", 4, "ngFor", "ngForOf"], [3, "paragraph"], ["id", "placeholder"]], template: function DocumentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, DocumentComponent_div_0_Template, 2, 1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, DocumentComponent_ng_template_1_Template, 2, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.document)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _paragraph_paragraph_component__WEBPACK_IMPORTED_MODULE_1__.ParagraphComponent], styles: ["html[_ngcontent-%COMP%], body[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  max-width: 100%;\n  padding: 0;\n  margin: 0;\n  overflow: hidden;\n}\nbody[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\nhtml[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n@media screen and (min-width: 1800px) {\n  html[_ngcontent-%COMP%] {\n    font-size: calc(13px + 6 * ((100vw - 1800px) / 400));\n  }\n}\n\n\n\n\n\n\n*[_ngcontent-%COMP%]::-webkit-scrollbar, *[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  width: 15px;\n  border-radius: 13px;\n  background-clip: padding-box;\n  border: 5px solid transparent;\n  background-color: white;\n}\n*[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  box-shadow: inset 0 0 0 10px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  box-shadow: none;\n  background-color: white;\n}\n\n.success[_ngcontent-%COMP%] {\n  color: white;\n  background-color: rgba(30, 155, 53, 0.671) !important;\n}\n.success[_ngcontent-%COMP%]   .mat-button-wrapper[_ngcontent-%COMP%] {\n  color: white;\n}\n.error[_ngcontent-%COMP%] {\n  color: white;\n  background-color: #c43404 !important;\n}\n.error[_ngcontent-%COMP%]   .mat-button-wrapper[_ngcontent-%COMP%] {\n  color: white;\n}\n\n  .mat-stroked-button {\n  width: 4vw !important;\n  height: 4vh !important;\n  min-width: -webkit-fit-content;\n  min-width: -moz-fit-content;\n  min-width: fit-content;\n  font-size: 1em;\n}\n\n@media screen and (min-width: 2000px) {\n  .mat-slide-toggle[_ngcontent-%COMP%] {\n    transform: scale(1.4);\n  }\n}\n\n  .mat-slider-horizontal {\n  min-width: 8vw;\n}\n\n@media screen and (min-width: 2000px) {\n  .mat-checkbox-inner-container[_ngcontent-%COMP%] {\n    transform: scale(1.4);\n  }\n}\n@media screen and (min-width: 2000px) {\n  .mat-snack-bar-container[_ngcontent-%COMP%] {\n    transform: scale(1.4) !important;\n  }\n}\n\n  .mat-form-field-infix {\n  border-top: 0.4375em solid transparent;\n}\n[_nghost-%COMP%] {\n  flex-grow: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n  min-height: 2em;\n  position: relative;\n  width: 75vw;\n  max-width: 75vw;\n  border-left: 1px solid rgba(0, 0, 0, 0.2);\n  border-right: 1px solid rgba(0, 0, 0, 0.2);\n  background: white;\n  color: rgba(0, 0, 0, 0);\n  text-shadow: 0 0 black;\n  transition: color 0.3s ease;\n}\n[_nghost-%COMP%]:hover {\n  color: rgba(0, 0, 0, 0.3);\n}\n#placeholder[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  flex-grow: 1;\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHN0eWxlcy5zY3NzIiwiZG9jdW1lbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOEVBQUE7QUFFQTtFQUNJLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7QUNBSjtBREdBO0VBQ0ksU0FBQTtFQUNBLGlEQUFBO0FDQUo7QURHQTtFQUNJLGVBQUE7QUNBSjtBREdBO0VBQ0k7SUFDRSxvREFBQTtFQ0FKO0FBQ0Y7QURJQSxtQ0FBQTtBQVVBLGFBQUE7QUFZQSxhQUFBO0FBWUEsYUFBQTtBQVlBLGtCQUFBO0FBWUEsNkJBQUE7QUFFQTs7RUFFRSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSw0QkFBQTtFQUNBLDZCQUFBO0VBQ0EsdUJBQUE7QUN4REY7QUQyREE7RUFDRSw0QkFBQTtBQ3hERjtBRDJEQTtFQUNJLGdCQUFBO0VBQ0EsdUJBQUE7QUN4REo7QUQyREEsbUNBQUE7QUFDQTtFQUNJLFlBQUE7RUFDQSxxREFBQTtBQ3hESjtBRDBESTtFQUNJLFlBQUE7QUN4RFI7QUQ0REE7RUFDSSxZQUFBO0VBQ0Esb0NBQUE7QUN6REo7QUQyREk7RUFDSSxZQUFBO0FDekRSO0FEOERBLHNDQUFBO0FBR0k7RUFDSSxxQkFBQTtFQUNBLHNCQUFBO0VBQ0EsOEJBQUE7RUFBQSwyQkFBQTtFQUFBLHNCQUFBO0VBQ0EsY0FBQTtBQzdEUjtBRGtFQSxnQ0FBQTtBQUVBO0VBQ0k7SUFDSSxxQkFBQTtFQ2hFTjtBQUNGO0FEb0VBLG1DQUFBO0FBR0k7RUFDSSxjQUFBO0FDcEVSO0FEeUVBLGdDQUFBO0FBRUE7RUFDSTtJQUNJLHFCQUFBO0VDdkVOO0FBQ0Y7QUQwRUE7RUFDSTtJQUNJLGdDQUFBO0VDeEVOO0FBQ0Y7QUQ0RUEsdUNBQUE7QUFHSTtFQUNJLHNDQUFBO0FDNUVSO0FBaEdBO0VBQ0ksWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLHlDQUFBO0VBQ0EsMENBQUE7RUFDQSxpQkFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7RUFFQSwyQkFBQTtBQWtHSjtBQS9GQTtFQUNJLHlCQUFBO0FBa0dKO0FBOUZBO0VBQ0ksYUFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBaUdKIiwiZmlsZSI6ImRvY3VtZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogWW91IGNhbiBhZGQgZ2xvYmFsIHN0eWxlcyB0byB0aGlzIGZpbGUsIGFuZCBhbHNvIGltcG9ydCBvdGhlciBzdHlsZSBmaWxlcyAqL1xyXG5cclxuaHRtbCwgYm9keSB7IFxyXG4gICAgaGVpZ2h0OiAxMDAlOyBcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbmJvZHkgeyBcclxuICAgIG1hcmdpbjogMDsgXHJcbiAgICBmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7IFxyXG59XHJcblxyXG5odG1sIHtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTgwMHB4KSB7XHJcbiAgICBodG1sIHtcclxuICAgICAgZm9udC1zaXplOiBjYWxjKDEzcHggKyA2ICogKCgxMDB2dyAtIDE4MDBweCkgLyA0MDApKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKioqKioqIENPTE9SIFBBTEVUVEUgKioqKioqKioqKioqL1xyXG5cclxuJHByaW1hcnk6IHJnYig2MyA4MSAxODEpO1xyXG4kZ3JlZW4tY29ycmVjdC10ZXh0OiByZ2JhKDMwLCAxNTUsIDUzKTtcclxuJGdyZWVuLWNvcnJlY3QtYmFja2dyb3VuZDogcmdiKDEyOCwgMjQwLCAxNzkpO1xyXG4kcmVkLWVycm9yLXRleHQ6IHJnYigxNzksIDYsIDYpO1xyXG4kcmVkLWVycm9yLWJhY2tncm91bmQ6IHJnYigyNDAsIDEzMywgMTMzKTtcclxuJGdyZXktYmFja2dyb3VuZDogcmdiKDI0MCwgMjM5LCAyMzksIDEpO1xyXG4kZ3JleS1ib3JkZXI6cmdiYSgxODcsIDE4MywgMTgzLCAwLjkpO1xyXG5cclxuLyogU0NTUyBIRVggKi9cclxuJGxhdmVuZGVyLXdlYjogICAgICAgI2RmZGVmN2ZmO1xyXG4kcGVyaXdpbmtsZS1jcmF5b2xhOiAjYzhkNWYyZmY7XHJcbiRsaWdodC1zdGVlbC1ibHVlOiAgICNiMWNjZWRmZjtcclxuJG1pZGRsZS1ibHVlLWdyZWVuOiAgI2ExZDZjNmZmO1xyXG4kZ3Jhbm55LXNtaXRoLWFwcGxlOiAjOTBlMDlmZmY7XHJcbiRzdHJhdzogICAgICAgICAgICAgICNkNmNkNWZmZjtcclxuJHN1bnJheTogICAgICAgICAgICAgI2Q4YWI1NmZmO1xyXG4kcmF3LXNpZW5uYTogICAgICAgICAjZTE4MTNmZmY7XHJcbiRmbGFtZTogICAgICAgICAgICAgICNlOTU3MjdmZjtcclxuJHJlZC1yeWI6ICAgICAgICAgICAgI2ZmNDAxZmZmO1xyXG5cclxuLyogU0NTUyBIU0wgKi9cclxuJGxhdmVuZGVyLXdlYjogaHNsYSgyNDIsIDYxJSwgOTIlLCAxKTtcclxuJHBlcml3aW5rbGUtY3JheW9sYTogaHNsYSgyMjEsIDYyJSwgODclLCAxKTtcclxuJGxpZ2h0LXN0ZWVsLWJsdWU6IGhzbGEoMjEzLCA2MyUsIDgxJSwgMSk7XHJcbiRtaWRkbGUtYmx1ZS1ncmVlbjogaHNsYSgxNjIsIDM5JSwgNzQlLCAxKTtcclxuJGdyYW5ueS1zbWl0aC1hcHBsZTogaHNsYSgxMzEsIDU2JSwgNzIlLCAxKTtcclxuJHN0cmF3OiBoc2xhKDU1LCA1OSUsIDYxJSwgMSk7XHJcbiRzdW5yYXk6IGhzbGEoMzksIDYzJSwgNTklLCAxKTtcclxuJHJhdy1zaWVubmE6IGhzbGEoMjQsIDczJSwgNTYlLCAxKTtcclxuJGZsYW1lOiBoc2xhKDE1LCA4MiUsIDUzJSwgMSk7XHJcbiRyZWQtcnliOiBoc2xhKDksIDEwMCUsIDU2JSwgMSk7XHJcblxyXG4vKiBTQ1NTIFJHQiAqL1xyXG4kbGF2ZW5kZXItd2ViOiByZ2JhKDIyMywgMjIyLCAyNDcsIDEpO1xyXG4kcGVyaXdpbmtsZS1jcmF5b2xhOiByZ2JhKDIwMCwgMjEzLCAyNDIsIDEpO1xyXG4kbGlnaHQtc3RlZWwtYmx1ZTogcmdiYSgxNzcsIDIwNCwgMjM3LCAxKTtcclxuJG1pZGRsZS1ibHVlLWdyZWVuOiByZ2JhKDE2MSwgMjE0LCAxOTgsIDEpO1xyXG4kZ3Jhbm55LXNtaXRoLWFwcGxlOiByZ2JhKDE0NCwgMjI0LCAxNTksIDEpO1xyXG4kc3RyYXc6IHJnYmEoMjE0LCAyMDUsIDk1LCAxKTtcclxuJHN1bnJheTogcmdiYSgyMTYsIDE3MSwgODYsIDEpO1xyXG4kcmF3LXNpZW5uYTogcmdiYSgyMjUsIDEyOSwgNjMsIDEpO1xyXG4kZmxhbWU6IHJnYmEoMjMzLCA4NywgMzksIDEpO1xyXG4kcmVkLXJ5YjogcmdiYSgyNTUsIDY0LCAzMSwgMSk7XHJcblxyXG4vKiBTQ1NTIEdyYWRpZW50ICovXHJcbiRncmFkaWVudC10b3A6IGxpbmVhci1ncmFkaWVudCgwZGVnLCAjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG4kZ3JhZGllbnQtcmlnaHQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LWJvdHRvbTogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LWxlZnQ6IGxpbmVhci1ncmFkaWVudCgyNzBkZWcsICNkZmRlZjdmZiwgI2M4ZDVmMmZmLCAjYjFjY2VkZmYsICNhMWQ2YzZmZiwgIzkwZTA5ZmZmLCAjZDZjZDVmZmYsICNkOGFiNTZmZiwgI2UxODEzZmZmLCAjZTk1NzI3ZmYsICNmZjQwMWZmZik7XHJcbiRncmFkaWVudC10b3AtcmlnaHQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LWJvdHRvbS1yaWdodDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LXRvcC1sZWZ0OiBsaW5lYXItZ3JhZGllbnQoMjI1ZGVnLCAjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG4kZ3JhZGllbnQtYm90dG9tLWxlZnQ6IGxpbmVhci1ncmFkaWVudCgzMTVkZWcsICNkZmRlZjdmZiwgI2M4ZDVmMmZmLCAjYjFjY2VkZmYsICNhMWQ2YzZmZiwgIzkwZTA5ZmZmLCAjZDZjZDVmZmYsICNkOGFiNTZmZiwgI2UxODEzZmZmLCAjZTk1NzI3ZmYsICNmZjQwMWZmZik7XHJcbiRncmFkaWVudC1yYWRpYWw6IHJhZGlhbC1ncmFkaWVudCgjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG5cclxuXHJcbi8qKioqKioqIFNDUk9MTEJBUiAqKioqKioqKioqL1xyXG5cclxuKjo6LXdlYmtpdC1zY3JvbGxiYXIsXHJcbio6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICB3aWR0aDogMTVweDtcclxuICBib3JkZXItcmFkaXVzOiAxM3B4O1xyXG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XHJcbiAgYm9yZGVyOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbio6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHsgICAgICAgIFxyXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDEwcHg7XHJcbn1cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4vKioqKioqKioqIE5PVElGSUNBVElPTlMgKioqKioqKioqKi9cclxuLnN1Y2Nlc3Mge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzMCwgMTU1LCA1MywgMC42NzEpIWltcG9ydGFudDtcclxuXHJcbiAgICAubWF0LWJ1dHRvbi13cmFwcGVyIHtcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5lcnJvciB7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTk2LCA1MiwgNCkhaW1wb3J0YW50O1xyXG5cclxuICAgIC5tYXQtYnV0dG9uLXdyYXBwZXIge1xyXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKioqKioqKioqKiBCVVRUT05TICoqKioqKioqKioqKioqKioqL1xyXG5cclxuOjpuZy1kZWVwIHtcclxuICAgIC5tYXQtc3Ryb2tlZC1idXR0b24ge1xyXG4gICAgICAgIHdpZHRoOiA0dnchaW1wb3J0YW50O1xyXG4gICAgICAgIGhlaWdodDogNHZoIWltcG9ydGFudDtcclxuICAgICAgICBtaW4td2lkdGg6Zml0LWNvbnRlbnQ7XHJcbiAgICAgICAgZm9udC1zaXplOiAxZW07XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKioqKioqKioqKiBUT0dMRVMgKioqKioqKioqKioqKi9cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDIwMDBweCkge1xyXG4gICAgLm1hdC1zbGlkZS10b2dnbGUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcclxuICAgIH0gICAgXHJcbn1cclxuXHJcblxyXG4vKioqKioqKioqIFNMSURFUlMgKioqKioqKioqKioqKioqKi9cclxuXHJcbjo6bmctZGVlcCB7XHJcbiAgICAubWF0LXNsaWRlci1ob3Jpem9udGFsIHtcclxuICAgICAgICBtaW4td2lkdGg6IDh2dztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKioqKioqKiogQ0hFQ0tCT1ggKioqKioqKioqKioqL1xyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMjAwMHB4KSB7XHJcbiAgICAubWF0LWNoZWNrYm94LWlubmVyLWNvbnRhaW5lciB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xyXG4gICAgfSAgICBcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMjAwMHB4KSB7XHJcbiAgICAubWF0LXNuYWNrLWJhci1jb250YWluZXIge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KSFpbXBvcnRhbnQ7XHJcbiAgICB9ICAgIFxyXG59XHJcblxyXG5cclxuLyoqKioqKioqKioqIElOUFVUIEZJRUxEUyAqKioqKioqKioqKioqL1xyXG5cclxuOjpuZy1kZWVwIHtcclxuICAgIC5tYXQtZm9ybS1maWVsZC1pbmZpeCB7XHJcbiAgICAgICAgYm9yZGVyLXRvcDogMC40Mzc1ZW0gc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICB9XHJcbn0iLCIvKiBZb3UgY2FuIGFkZCBnbG9iYWwgc3R5bGVzIHRvIHRoaXMgZmlsZSwgYW5kIGFsc28gaW1wb3J0IG90aGVyIHN0eWxlIGZpbGVzICovXG5odG1sLCBib2R5IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbmJvZHkge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbn1cblxuaHRtbCB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTgwMHB4KSB7XG4gIGh0bWwge1xuICAgIGZvbnQtc2l6ZTogY2FsYygxM3B4ICsgNiAqICgoMTAwdncgLSAxODAwcHgpIC8gNDAwKSk7XG4gIH1cbn1cbi8qKioqKioqIENPTE9SIFBBTEVUVEUgKioqKioqKioqKioqL1xuLyogU0NTUyBIRVggKi9cbi8qIFNDU1MgSFNMICovXG4vKiBTQ1NTIFJHQiAqL1xuLyogU0NTUyBHcmFkaWVudCAqL1xuLyoqKioqKiogU0NST0xMQkFSICoqKioqKioqKiovXG4qOjotd2Via2l0LXNjcm9sbGJhcixcbio6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgd2lkdGg6IDE1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDEzcHg7XG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gIGJvcmRlcjogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuKjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAxMHB4O1xufVxuXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi8qKioqKioqKiogTk9USUZJQ0FUSU9OUyAqKioqKioqKioqL1xuLnN1Y2Nlc3Mge1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzAsIDE1NSwgNTMsIDAuNjcxKSAhaW1wb3J0YW50O1xufVxuLnN1Y2Nlc3MgLm1hdC1idXR0b24td3JhcHBlciB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmVycm9yIHtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzQzNDA0ICFpbXBvcnRhbnQ7XG59XG4uZXJyb3IgLm1hdC1idXR0b24td3JhcHBlciB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLyoqKioqKioqKioqIEJVVFRPTlMgKioqKioqKioqKioqKioqKiovXG46Om5nLWRlZXAgLm1hdC1zdHJva2VkLWJ1dHRvbiB7XG4gIHdpZHRoOiA0dncgIWltcG9ydGFudDtcbiAgaGVpZ2h0OiA0dmggIWltcG9ydGFudDtcbiAgbWluLXdpZHRoOiBmaXQtY29udGVudDtcbiAgZm9udC1zaXplOiAxZW07XG59XG5cbi8qKioqKioqKioqIFRPR0xFUyAqKioqKioqKioqKioqL1xuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMjAwMHB4KSB7XG4gIC5tYXQtc2xpZGUtdG9nZ2xlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XG4gIH1cbn1cbi8qKioqKioqKiogU0xJREVSUyAqKioqKioqKioqKioqKioqL1xuOjpuZy1kZWVwIC5tYXQtc2xpZGVyLWhvcml6b250YWwge1xuICBtaW4td2lkdGg6IDh2dztcbn1cblxuLyoqKioqKioqKiBDSEVDS0JPWCAqKioqKioqKioqKiovXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAyMDAwcHgpIHtcbiAgLm1hdC1jaGVja2JveC1pbm5lci1jb250YWluZXIge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMjAwMHB4KSB7XG4gIC5tYXQtc25hY2stYmFyLWNvbnRhaW5lciB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpICFpbXBvcnRhbnQ7XG4gIH1cbn1cbi8qKioqKioqKioqKiBJTlBVVCBGSUVMRFMgKioqKioqKioqKioqKi9cbjo6bmctZGVlcCAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICBib3JkZXItdG9wOiAwLjQzNzVlbSBzb2xpZCB0cmFuc3BhcmVudDtcbn1cblxuOmhvc3Qge1xuICBmbGV4LWdyb3c6IDE7XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgbWluLWhlaWdodDogMmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiA3NXZ3O1xuICBtYXgtd2lkdGg6IDc1dnc7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcbiAgdGV4dC1zaGFkb3c6IDAgMCBibGFjaztcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4zcyBlYXNlO1xufVxuXG46aG9zdDpob3ZlciB7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XG59XG5cbiNwbGFjZWhvbGRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmbGV4LWdyb3c6IDE7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59Il19 */"] });


/***/ }),

/***/ 5045:
/*!*************************************************************!*\
  !*** ./src/app/components/label-tab/label-tab.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LabelTabComponent": () => (/* binding */ LabelTabComponent)
/* harmony export */ });
/* harmony import */ var src_app_models_fixation_area_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/models/fixation-area.model */ 2878);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_facade_data_data_facade__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/facade/data/data.facade */ 1461);
/* harmony import */ var src_app_facade_label_level_label_level_facade__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/facade/label-level/label-level.facade */ 4899);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/slider */ 3616);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 5788);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 4742);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 4364);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/slide-toggle */ 2080);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 781);












function LabelTabComponent_mat_error_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Min margin: 0 letters");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function LabelTabComponent_mat_error_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Min margin: 0 letters");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function LabelTabComponent_button_40_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LabelTabComponent_button_40_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r3.updateFixationArea(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Apply ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx_r2.isApplyDisabled);
} }
class LabelTabComponent {
    constructor(dataFacade, labelLevelFacade, fb) {
        this.dataFacade = dataFacade;
        this.labelLevelFacade = labelLevelFacade;
        // General settings
        this.isEnabled = false;
        this.isLabelLevelUpdating = false;
        this.isDataUpdating = false;
        // Fixation duration settings
        this.sliderStep = 5;
        this.thumbLabel = false;
        this.minFixation = 0;
        this.maxFixation = 0;
        this.minFixationInterval = [0, 400];
        this.maxFixationInterval = [500, 800];
        this.leftMarginCtrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl({ value: null }, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.min(0));
        this.rightMarginCtrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl({ value: null }, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.min(0));
        // create form group
        this.fixationAreaOptions = fb.group({
            leftMargin: this.leftMarginCtrl,
            rightMargin: this.rightMarginCtrl
        });
        // subscriptions
        this.labelLevelFacade.isEnabled$()
            .subscribe((value) => {
            this.isEnabled = value;
            this.enableFixationAreaOptions();
        });
        this.dataFacade.isUpdating$()
            .subscribe((value) => { this.isDataUpdating = value; });
        this.labelLevelFacade.isUpdating$()
            .subscribe((value) => { this.isLabelLevelUpdating = value; });
        this.labelLevelFacade.getMinFixation$()
            .subscribe((value) => { this.minFixation = value; });
        this.labelLevelFacade.getMaxFixation$()
            .subscribe((value) => { this.maxFixation = value; });
        this.labelLevelFacade.getFixationArea$()
            .subscribe((fixationArea) => {
            this.fixationAreaOptions.controls['leftMargin']
                .setValue(fixationArea.leftMargin);
            this.fixationAreaOptions.controls['rightMargin']
                .setValue(fixationArea.rightMargin);
        });
    }
    ngOnInit() {
        this.enableFixationAreaOptions();
    }
    /**
     * Any state is being updated.
     */
    get isUpdating() {
        return this.isLabelLevelUpdating || this.isDataUpdating;
    }
    /**
     * The apply button is disabled.
     */
    get isApplyDisabled() {
        return !this.fixationAreaOptions.valid;
    }
    /**
     * Enables or disables the form controls depending on the
     * `@this.isEnabled` value.
     */
    enableFixationAreaOptions() {
        if (this.isEnabled) {
            this.fixationAreaOptions.enable();
        }
        else {
            this.fixationAreaOptions.disable();
        }
    }
    /**
     * Enable/disable the lebel level.
     * @param enabled is enabled.
     */
    setLabelLevelEnabled(enabled) {
        this.labelLevelFacade.setEnabled(enabled);
    }
    /** Update the minimum fixation duration */
    updateMinFixation() {
        this.labelLevelFacade.setMinFixation(this.minFixation);
    }
    /** Update the maximum fixation duration */
    updateMaxFixation() {
        this.labelLevelFacade.setMaxFixation(this.maxFixation);
    }
    /**
     * Updates the fixation area configuration.
     */
    updateFixationArea() {
        if (this.fixationAreaOptions.valid) {
            this.labelLevelFacade.setFixationArea(new src_app_models_fixation_area_model__WEBPACK_IMPORTED_MODULE_0__.FixationArea(this.leftMarginCtrl.value, this.rightMarginCtrl.value));
        }
    }
}
LabelTabComponent.ɵfac = function LabelTabComponent_Factory(t) { return new (t || LabelTabComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_facade_data_data_facade__WEBPACK_IMPORTED_MODULE_1__.DataFacade), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_facade_label_level_label_level_facade__WEBPACK_IMPORTED_MODULE_2__.LabelLevelFacade), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder)); };
LabelTabComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: LabelTabComponent, selectors: [["app-label-tab"]], decls: 48, vars: 20, consts: [["id", "fixation-duration-settings", 1, "section"], [1, "section-title"], [1, "flex-row"], [1, "slider-container"], [1, "name-label"], ["color", "primary", "aria-labelledby", "name-label", 1, "margin", 3, "disabled", "min", "max", "step", "thumbLabel", "ngModel", "ngModelChange"], [1, "value-label"], ["id", "fixation-area-settings", 1, "section"], [1, "input-field"], ["appearance", "fill"], ["matInput", "", "type", "number", "min", "0", "required", "", 3, "formControl"], ["matSuffix", ""], [4, "ngIf"], ["appearance", "fill", "color", "primary"], ["id", "apply-button", 1, "section"], ["id", "button-container"], ["mat-flat-button", "", "color", "primary", 3, "disabled", "click", 4, "ngIf"], ["id", "enabling-settings", 1, "section"], ["id", "toggle-container"], ["color", "primary", 3, "checked", "change"], ["mat-flat-button", "", "color", "primary", 3, "disabled", "click"]], template: function LabelTabComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Fixation duration");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Fixation Min");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "mat-slider", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function LabelTabComponent_Template_mat_slider_ngModelChange_8_listener($event) { return ctx.minFixation = $event; })("ngModelChange", function LabelTabComponent_Template_mat_slider_ngModelChange_8_listener() { return ctx.updateMinFixation(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Fixation Max");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "mat-slider", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function LabelTabComponent_Template_mat_slider_ngModelChange_14_listener($event) { return ctx.maxFixation = $event; })("ngModelChange", function LabelTabComponent_Template_mat_slider_ngModelChange_14_listener() { return ctx.updateMaxFixation(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "Horizontal fixation area");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "Left margin");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "mat-form-field", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](26, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28, "letters");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](29, LabelTabComponent_mat_error_29_Template, 2, 0, "mat-error", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](32, "Right margin");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "mat-form-field", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](34, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "letters");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](37, LabelTabComponent_mat_error_37_Template, 2, 0, "mat-error", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](39, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](40, LabelTabComponent_button_40_Template, 2, 1, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](42, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44, "Off");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "mat-slide-toggle", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function LabelTabComponent_Template_mat_slide_toggle_change_45_listener($event) { return ctx.setLabelLevelEnabled($event.checked); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "On");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx.isEnabled)("min", ctx.minFixationInterval[0])("max", ctx.minFixationInterval[1])("step", ctx.sliderStep)("thumbLabel", ctx.thumbLabel)("ngModel", ctx.minFixation);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.minFixation);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx.isEnabled)("min", ctx.maxFixationInterval[0])("max", ctx.maxFixationInterval[1])("step", ctx.sliderStep)("thumbLabel", ctx.thumbLabel)("ngModel", ctx.maxFixation);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.maxFixation);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.leftMarginCtrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.leftMarginCtrl.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.rightMarginCtrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.rightMarginCtrl.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isUpdating);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("checked", ctx.isEnabled);
    } }, directives: [_angular_material_slider__WEBPACK_IMPORTED_MODULE_5__.MatSlider, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatSuffix, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_9__.MatSlideToggle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatError, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton], styles: ["html[_ngcontent-%COMP%], body[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  max-width: 100%;\n  padding: 0;\n  margin: 0;\n  overflow: hidden;\n}\nbody[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\nhtml[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n@media screen and (min-width: 1800px) {\n  html[_ngcontent-%COMP%] {\n    font-size: calc(13px + 6 * ((100vw - 1800px) / 400));\n  }\n}\n\n\n\n\n\n\n*[_ngcontent-%COMP%]::-webkit-scrollbar, *[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  width: 15px;\n  border-radius: 13px;\n  background-clip: padding-box;\n  border: 5px solid transparent;\n  background-color: white;\n}\n*[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  box-shadow: inset 0 0 0 10px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  box-shadow: none;\n  background-color: white;\n}\n\n.success[_ngcontent-%COMP%] {\n  color: white;\n  background-color: rgba(30, 155, 53, 0.671) !important;\n}\n.success[_ngcontent-%COMP%]   .mat-button-wrapper[_ngcontent-%COMP%] {\n  color: white;\n}\n.error[_ngcontent-%COMP%] {\n  color: white;\n  background-color: #c43404 !important;\n}\n.error[_ngcontent-%COMP%]   .mat-button-wrapper[_ngcontent-%COMP%] {\n  color: white;\n}\n\n  .mat-stroked-button {\n  width: 4vw !important;\n  height: 4vh !important;\n  min-width: -webkit-fit-content;\n  min-width: -moz-fit-content;\n  min-width: fit-content;\n  font-size: 1em;\n}\n\n@media screen and (min-width: 2000px) {\n  .mat-slide-toggle[_ngcontent-%COMP%] {\n    transform: scale(1.4);\n  }\n}\n\n  .mat-slider-horizontal {\n  min-width: 8vw;\n}\n\n@media screen and (min-width: 2000px) {\n  .mat-checkbox-inner-container[_ngcontent-%COMP%] {\n    transform: scale(1.4);\n  }\n}\n@media screen and (min-width: 2000px) {\n  .mat-snack-bar-container[_ngcontent-%COMP%] {\n    transform: scale(1.4) !important;\n  }\n}\n\n  .mat-form-field-infix {\n  border-top: 0.4375em solid transparent;\n}\n[_nghost-%COMP%] {\n  display: flex;\n  overflow: hidden;\n  padding: 0px 10px;\n  font-size: min(1vw, 1.6vh);\n}\n.section[_ngcontent-%COMP%] {\n  flex: 1;\n  flex-grow: 4;\n  display: flex;\n  flex-direction: column;\n  padding: 5px;\n}\n.section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 10px 0px;\n}\n.section#fixation-area-settings[_ngcontent-%COMP%]     .mat-form-field {\n  max-width: 11vw;\n}\n.section#apply-button[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  align-items: center;\n  justify-content: center;\n}\n.section#apply-button[_ngcontent-%COMP%]     button {\n  max-width: 4vw;\n}\n.section#enabling-settings[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  align-items: flex-end;\n}\n.section#enabling-settings[_ngcontent-%COMP%]   #toggle-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-grow: 1;\n  flex-basis: auto;\n  padding: 1vh 1vw;\n}\n.section#enabling-settings[_ngcontent-%COMP%]   #toggle-container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  padding: 0px 2px 0px 2px;\n  margin: 0 1vw;\n}\nlabel[_ngcontent-%COMP%] {\n  padding: 10px;\n}\n.flex-row[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHN0eWxlcy5zY3NzIiwibGFiZWwtdGFiLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhFQUFBO0FBRUE7RUFDSSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0FDQUo7QURHQTtFQUNJLFNBQUE7RUFDQSxpREFBQTtBQ0FKO0FER0E7RUFDSSxlQUFBO0FDQUo7QURHQTtFQUNJO0lBQ0Usb0RBQUE7RUNBSjtBQUNGO0FESUEsbUNBQUE7QUFVQSxhQUFBO0FBWUEsYUFBQTtBQVlBLGFBQUE7QUFZQSxrQkFBQTtBQVlBLDZCQUFBO0FBRUE7O0VBRUUsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLHVCQUFBO0FDeERGO0FEMkRBO0VBQ0UsNEJBQUE7QUN4REY7QUQyREE7RUFDSSxnQkFBQTtFQUNBLHVCQUFBO0FDeERKO0FEMkRBLG1DQUFBO0FBQ0E7RUFDSSxZQUFBO0VBQ0EscURBQUE7QUN4REo7QUQwREk7RUFDSSxZQUFBO0FDeERSO0FENERBO0VBQ0ksWUFBQTtFQUNBLG9DQUFBO0FDekRKO0FEMkRJO0VBQ0ksWUFBQTtBQ3pEUjtBRDhEQSxzQ0FBQTtBQUdJO0VBQ0kscUJBQUE7RUFDQSxzQkFBQTtFQUNBLDhCQUFBO0VBQUEsMkJBQUE7RUFBQSxzQkFBQTtFQUNBLGNBQUE7QUM3RFI7QURrRUEsZ0NBQUE7QUFFQTtFQUNJO0lBQ0kscUJBQUE7RUNoRU47QUFDRjtBRG9FQSxtQ0FBQTtBQUdJO0VBQ0ksY0FBQTtBQ3BFUjtBRHlFQSxnQ0FBQTtBQUVBO0VBQ0k7SUFDSSxxQkFBQTtFQ3ZFTjtBQUNGO0FEMEVBO0VBQ0k7SUFDSSxnQ0FBQTtFQ3hFTjtBQUNGO0FENEVBLHVDQUFBO0FBR0k7RUFDSSxzQ0FBQTtBQzVFUjtBQWhHQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsMEJBQUE7QUFtR0Y7QUFoR0E7RUFDRSxPQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7QUFtR0Y7QUFqR0U7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7QUFtR0o7QUFqR0k7RUFDRSxpQkFBQTtBQW1HTjtBQTNGSTtFQUNFLGVBQUE7QUE4Rk47QUF6RkE7RUFDRSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQTRGRjtBQXpGSTtFQUNFLGNBQUE7QUEyRk47QUF0RkE7RUFDRSxZQUFBO0VBQ0EscUJBQUE7QUF5RkY7QUF2RkU7RUFDRSxhQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUF5Rko7QUF2Rkk7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSx3QkFBQTtFQUNBLGFBQUE7QUF5Rk47QUFwRkE7RUFDRSxhQUFBO0FBdUZGO0FBcEZBO0VBQ0UsT0FBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0EsNkJBQUE7RUFDQSxtQkFBQTtBQXVGRiIsImZpbGUiOiJsYWJlbC10YWIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBZb3UgY2FuIGFkZCBnbG9iYWwgc3R5bGVzIHRvIHRoaXMgZmlsZSwgYW5kIGFsc28gaW1wb3J0IG90aGVyIHN0eWxlIGZpbGVzICovXHJcblxyXG5odG1sLCBib2R5IHsgXHJcbiAgICBoZWlnaHQ6IDEwMCU7IFxyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuYm9keSB7IFxyXG4gICAgbWFyZ2luOiAwOyBcclxuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjsgXHJcbn1cclxuXHJcbmh0bWwge1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxODAwcHgpIHtcclxuICAgIGh0bWwge1xyXG4gICAgICBmb250LXNpemU6IGNhbGMoMTNweCArIDYgKiAoKDEwMHZ3IC0gMTgwMHB4KSAvIDQwMCkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqKioqKiogQ09MT1IgUEFMRVRURSAqKioqKioqKioqKiovXHJcblxyXG4kcHJpbWFyeTogcmdiKDYzIDgxIDE4MSk7XHJcbiRncmVlbi1jb3JyZWN0LXRleHQ6IHJnYmEoMzAsIDE1NSwgNTMpO1xyXG4kZ3JlZW4tY29ycmVjdC1iYWNrZ3JvdW5kOiByZ2IoMTI4LCAyNDAsIDE3OSk7XHJcbiRyZWQtZXJyb3ItdGV4dDogcmdiKDE3OSwgNiwgNik7XHJcbiRyZWQtZXJyb3ItYmFja2dyb3VuZDogcmdiKDI0MCwgMTMzLCAxMzMpO1xyXG4kZ3JleS1iYWNrZ3JvdW5kOiByZ2IoMjQwLCAyMzksIDIzOSwgMSk7XHJcbiRncmV5LWJvcmRlcjpyZ2JhKDE4NywgMTgzLCAxODMsIDAuOSk7XHJcblxyXG4vKiBTQ1NTIEhFWCAqL1xyXG4kbGF2ZW5kZXItd2ViOiAgICAgICAjZGZkZWY3ZmY7XHJcbiRwZXJpd2lua2xlLWNyYXlvbGE6ICNjOGQ1ZjJmZjtcclxuJGxpZ2h0LXN0ZWVsLWJsdWU6ICAgI2IxY2NlZGZmO1xyXG4kbWlkZGxlLWJsdWUtZ3JlZW46ICAjYTFkNmM2ZmY7XHJcbiRncmFubnktc21pdGgtYXBwbGU6ICM5MGUwOWZmZjtcclxuJHN0cmF3OiAgICAgICAgICAgICAgI2Q2Y2Q1ZmZmO1xyXG4kc3VucmF5OiAgICAgICAgICAgICAjZDhhYjU2ZmY7XHJcbiRyYXctc2llbm5hOiAgICAgICAgICNlMTgxM2ZmZjtcclxuJGZsYW1lOiAgICAgICAgICAgICAgI2U5NTcyN2ZmO1xyXG4kcmVkLXJ5YjogICAgICAgICAgICAjZmY0MDFmZmY7XHJcblxyXG4vKiBTQ1NTIEhTTCAqL1xyXG4kbGF2ZW5kZXItd2ViOiBoc2xhKDI0MiwgNjElLCA5MiUsIDEpO1xyXG4kcGVyaXdpbmtsZS1jcmF5b2xhOiBoc2xhKDIyMSwgNjIlLCA4NyUsIDEpO1xyXG4kbGlnaHQtc3RlZWwtYmx1ZTogaHNsYSgyMTMsIDYzJSwgODElLCAxKTtcclxuJG1pZGRsZS1ibHVlLWdyZWVuOiBoc2xhKDE2MiwgMzklLCA3NCUsIDEpO1xyXG4kZ3Jhbm55LXNtaXRoLWFwcGxlOiBoc2xhKDEzMSwgNTYlLCA3MiUsIDEpO1xyXG4kc3RyYXc6IGhzbGEoNTUsIDU5JSwgNjElLCAxKTtcclxuJHN1bnJheTogaHNsYSgzOSwgNjMlLCA1OSUsIDEpO1xyXG4kcmF3LXNpZW5uYTogaHNsYSgyNCwgNzMlLCA1NiUsIDEpO1xyXG4kZmxhbWU6IGhzbGEoMTUsIDgyJSwgNTMlLCAxKTtcclxuJHJlZC1yeWI6IGhzbGEoOSwgMTAwJSwgNTYlLCAxKTtcclxuXHJcbi8qIFNDU1MgUkdCICovXHJcbiRsYXZlbmRlci13ZWI6IHJnYmEoMjIzLCAyMjIsIDI0NywgMSk7XHJcbiRwZXJpd2lua2xlLWNyYXlvbGE6IHJnYmEoMjAwLCAyMTMsIDI0MiwgMSk7XHJcbiRsaWdodC1zdGVlbC1ibHVlOiByZ2JhKDE3NywgMjA0LCAyMzcsIDEpO1xyXG4kbWlkZGxlLWJsdWUtZ3JlZW46IHJnYmEoMTYxLCAyMTQsIDE5OCwgMSk7XHJcbiRncmFubnktc21pdGgtYXBwbGU6IHJnYmEoMTQ0LCAyMjQsIDE1OSwgMSk7XHJcbiRzdHJhdzogcmdiYSgyMTQsIDIwNSwgOTUsIDEpO1xyXG4kc3VucmF5OiByZ2JhKDIxNiwgMTcxLCA4NiwgMSk7XHJcbiRyYXctc2llbm5hOiByZ2JhKDIyNSwgMTI5LCA2MywgMSk7XHJcbiRmbGFtZTogcmdiYSgyMzMsIDg3LCAzOSwgMSk7XHJcbiRyZWQtcnliOiByZ2JhKDI1NSwgNjQsIDMxLCAxKTtcclxuXHJcbi8qIFNDU1MgR3JhZGllbnQgKi9cclxuJGdyYWRpZW50LXRvcDogbGluZWFyLWdyYWRpZW50KDBkZWcsICNkZmRlZjdmZiwgI2M4ZDVmMmZmLCAjYjFjY2VkZmYsICNhMWQ2YzZmZiwgIzkwZTA5ZmZmLCAjZDZjZDVmZmYsICNkOGFiNTZmZiwgI2UxODEzZmZmLCAjZTk1NzI3ZmYsICNmZjQwMWZmZik7XHJcbiRncmFkaWVudC1yaWdodDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG4kZ3JhZGllbnQtYm90dG9tOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG4kZ3JhZGllbnQtbGVmdDogbGluZWFyLWdyYWRpZW50KDI3MGRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LXRvcC1yaWdodDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG4kZ3JhZGllbnQtYm90dG9tLXJpZ2h0OiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG4kZ3JhZGllbnQtdG9wLWxlZnQ6IGxpbmVhci1ncmFkaWVudCgyMjVkZWcsICNkZmRlZjdmZiwgI2M4ZDVmMmZmLCAjYjFjY2VkZmYsICNhMWQ2YzZmZiwgIzkwZTA5ZmZmLCAjZDZjZDVmZmYsICNkOGFiNTZmZiwgI2UxODEzZmZmLCAjZTk1NzI3ZmYsICNmZjQwMWZmZik7XHJcbiRncmFkaWVudC1ib3R0b20tbGVmdDogbGluZWFyLWdyYWRpZW50KDMxNWRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LXJhZGlhbDogcmFkaWFsLWdyYWRpZW50KCNkZmRlZjdmZiwgI2M4ZDVmMmZmLCAjYjFjY2VkZmYsICNhMWQ2YzZmZiwgIzkwZTA5ZmZmLCAjZDZjZDVmZmYsICNkOGFiNTZmZiwgI2UxODEzZmZmLCAjZTk1NzI3ZmYsICNmZjQwMWZmZik7XHJcblxyXG5cclxuLyoqKioqKiogU0NST0xMQkFSICoqKioqKioqKiovXHJcblxyXG4qOjotd2Via2l0LXNjcm9sbGJhcixcclxuKjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gIHdpZHRoOiAxNXB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDEzcHg7XHJcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcclxuICBib3JkZXI6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuKjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIgeyAgICAgICAgXHJcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgMTBweDtcclxufVxyXG5cclxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XHJcbiAgICBib3gtc2hhZG93OiBub25lO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi8qKioqKioqKiogTk9USUZJQ0FUSU9OUyAqKioqKioqKioqL1xyXG4uc3VjY2VzcyB7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDMwLCAxNTUsIDUzLCAwLjY3MSkhaW1wb3J0YW50O1xyXG5cclxuICAgIC5tYXQtYnV0dG9uLXdyYXBwZXIge1xyXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIH1cclxufVxyXG5cclxuLmVycm9yIHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTYsIDUyLCA0KSFpbXBvcnRhbnQ7XHJcblxyXG4gICAgLm1hdC1idXR0b24td3JhcHBlciB7XHJcbiAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqKioqKioqKioqIEJVVFRPTlMgKioqKioqKioqKioqKioqKiovXHJcblxyXG46Om5nLWRlZXAge1xyXG4gICAgLm1hdC1zdHJva2VkLWJ1dHRvbiB7XHJcbiAgICAgICAgd2lkdGg6IDR2dyFpbXBvcnRhbnQ7XHJcbiAgICAgICAgaGVpZ2h0OiA0dmghaW1wb3J0YW50O1xyXG4gICAgICAgIG1pbi13aWR0aDpmaXQtY29udGVudDtcclxuICAgICAgICBmb250LXNpemU6IDFlbTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKioqKioqKioqIFRPR0xFUyAqKioqKioqKioqKioqL1xyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMjAwMHB4KSB7XHJcbiAgICAubWF0LXNsaWRlLXRvZ2dsZSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xyXG4gICAgfSAgICBcclxufVxyXG5cclxuXHJcbi8qKioqKioqKiogU0xJREVSUyAqKioqKioqKioqKioqKioqL1xyXG5cclxuOjpuZy1kZWVwIHtcclxuICAgIC5tYXQtc2xpZGVyLWhvcml6b250YWwge1xyXG4gICAgICAgIG1pbi13aWR0aDogOHZ3O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqKioqKioqKiBDSEVDS0JPWCAqKioqKioqKioqKiovXHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAyMDAwcHgpIHtcclxuICAgIC5tYXQtY2hlY2tib3gtaW5uZXItY29udGFpbmVyIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XHJcbiAgICB9ICAgIFxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAyMDAwcHgpIHtcclxuICAgIC5tYXQtc25hY2stYmFyLWNvbnRhaW5lciB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpIWltcG9ydGFudDtcclxuICAgIH0gICAgXHJcbn1cclxuXHJcblxyXG4vKioqKioqKioqKiogSU5QVVQgRklFTERTICoqKioqKioqKioqKiovXHJcblxyXG46Om5nLWRlZXAge1xyXG4gICAgLm1hdC1mb3JtLWZpZWxkLWluZml4IHtcclxuICAgICAgICBib3JkZXItdG9wOiAwLjQzNzVlbSBzb2xpZCB0cmFuc3BhcmVudDtcclxuICAgIH1cclxufSIsIi8qIFlvdSBjYW4gYWRkIGdsb2JhbCBzdHlsZXMgdG8gdGhpcyBmaWxlLCBhbmQgYWxzbyBpbXBvcnQgb3RoZXIgc3R5bGUgZmlsZXMgKi9cbmh0bWwsIGJvZHkge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuYm9keSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xufVxuXG5odG1sIHtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxODAwcHgpIHtcbiAgaHRtbCB7XG4gICAgZm9udC1zaXplOiBjYWxjKDEzcHggKyA2ICogKCgxMDB2dyAtIDE4MDBweCkgLyA0MDApKTtcbiAgfVxufVxuLyoqKioqKiogQ09MT1IgUEFMRVRURSAqKioqKioqKioqKiovXG4vKiBTQ1NTIEhFWCAqL1xuLyogU0NTUyBIU0wgKi9cbi8qIFNDU1MgUkdCICovXG4vKiBTQ1NTIEdyYWRpZW50ICovXG4vKioqKioqKiBTQ1JPTExCQVIgKioqKioqKioqKi9cbio6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuKjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICB3aWR0aDogMTVweDtcbiAgYm9yZGVyLXJhZGl1czogMTNweDtcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcbiAgYm9yZGVyOiA1cHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG4qOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDEwcHg7XG59XG5cbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xuICBib3gtc2hhZG93OiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLyoqKioqKioqKiBOT1RJRklDQVRJT05TICoqKioqKioqKiovXG4uc3VjY2VzcyB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzMCwgMTU1LCA1MywgMC42NzEpICFpbXBvcnRhbnQ7XG59XG4uc3VjY2VzcyAubWF0LWJ1dHRvbi13cmFwcGVyIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uZXJyb3Ige1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjNDM0MDQgIWltcG9ydGFudDtcbn1cbi5lcnJvciAubWF0LWJ1dHRvbi13cmFwcGVyIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4vKioqKioqKioqKiogQlVUVE9OUyAqKioqKioqKioqKioqKioqKi9cbjo6bmctZGVlcCAubWF0LXN0cm9rZWQtYnV0dG9uIHtcbiAgd2lkdGg6IDR2dyAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDR2aCAhaW1wb3J0YW50O1xuICBtaW4td2lkdGg6IGZpdC1jb250ZW50O1xuICBmb250LXNpemU6IDFlbTtcbn1cblxuLyoqKioqKioqKiogVE9HTEVTICoqKioqKioqKioqKiovXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAyMDAwcHgpIHtcbiAgLm1hdC1zbGlkZS10b2dnbGUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcbiAgfVxufVxuLyoqKioqKioqKiBTTElERVJTICoqKioqKioqKioqKioqKiovXG46Om5nLWRlZXAgLm1hdC1zbGlkZXItaG9yaXpvbnRhbCB7XG4gIG1pbi13aWR0aDogOHZ3O1xufVxuXG4vKioqKioqKioqIENIRUNLQk9YICoqKioqKioqKioqKi9cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDIwMDBweCkge1xuICAubWF0LWNoZWNrYm94LWlubmVyLWNvbnRhaW5lciB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAyMDAwcHgpIHtcbiAgLm1hdC1zbmFjay1iYXItY29udGFpbmVyIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCkgIWltcG9ydGFudDtcbiAgfVxufVxuLyoqKioqKioqKioqIElOUFVUIEZJRUxEUyAqKioqKioqKioqKioqL1xuOjpuZy1kZWVwIC5tYXQtZm9ybS1maWVsZC1pbmZpeCB7XG4gIGJvcmRlci10b3A6IDAuNDM3NWVtIHNvbGlkIHRyYW5zcGFyZW50O1xufVxuXG46aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmc6IDBweCAxMHB4O1xuICBmb250LXNpemU6IG1pbigxdncsIDEuNnZoKTtcbn1cblxuLnNlY3Rpb24ge1xuICBmbGV4OiAxO1xuICBmbGV4LWdyb3c6IDQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBhZGRpbmc6IDVweDtcbn1cbi5zZWN0aW9uIC5zZWN0aW9uLXRpdGxlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5zZWN0aW9uIC5zZWN0aW9uLXRpdGxlIHNwYW4ge1xuICBwYWRkaW5nOiAxMHB4IDBweDtcbn1cblxuLnNlY3Rpb24jZml4YXRpb24tYXJlYS1zZXR0aW5ncyA6Om5nLWRlZXAgLm1hdC1mb3JtLWZpZWxkIHtcbiAgbWF4LXdpZHRoOiAxMXZ3O1xufVxuXG4uc2VjdGlvbiNhcHBseS1idXR0b24ge1xuICBmbGV4LWdyb3c6IDE7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuLnNlY3Rpb24jYXBwbHktYnV0dG9uIDo6bmctZGVlcCBidXR0b24ge1xuICBtYXgtd2lkdGg6IDR2dztcbn1cblxuLnNlY3Rpb24jZW5hYmxpbmctc2V0dGluZ3Mge1xuICBmbGV4LWdyb3c6IDE7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbn1cbi5zZWN0aW9uI2VuYWJsaW5nLXNldHRpbmdzICN0b2dnbGUtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1ncm93OiAxO1xuICBmbGV4LWJhc2lzOiBhdXRvO1xuICBwYWRkaW5nOiAxdmggMXZ3O1xufVxuLnNlY3Rpb24jZW5hYmxpbmctc2V0dGluZ3MgI3RvZ2dsZS1jb250YWluZXIgbGFiZWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgcGFkZGluZzogMHB4IDJweCAwcHggMnB4O1xuICBtYXJnaW46IDAgMXZ3O1xufVxuXG5sYWJlbCB7XG4gIHBhZGRpbmc6IDEwcHg7XG59XG5cbi5mbGV4LXJvdyB7XG4gIGZsZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59Il19 */"] });


/***/ }),

/***/ 108:
/*!*****************************************************!*\
  !*** ./src/app/components/label/label.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LabelComponent": () => (/* binding */ LabelComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_facade_label_level_label_level_facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/facade/label-level/label-level.facade */ 4899);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4364);



const _c0 = function (a0, a1, a2, a3, a4, a5, a6) { return { "background-color": a0, "top.%": a1, "left.%": a2, "width.%": a3, "max-width.%": a4, "height.%": a5, "max-height.%": a6 }; };
const _c1 = function (a0) { return { "title": a0 }; };
function LabelComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction7"](3, _c0, ctx_r0.color, 100 * ctx_r0.label.y1, 100 * ctx_r0.label.x1, 100 * ctx_r0.label.width, 100 * ctx_r0.label.width, 100 * ctx_r0.label.height, 100 * ctx_r0.label.height));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](11, _c1, ctx_r0.isTitle));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.label.text);
} }
class LabelComponent {
    constructor(labelLevelFacade) {
        this.labelLevelFacade = labelLevelFacade;
        this.isTitle = false;
        this.color = "";
        this.isLabelLevelEnabled = false;
        this.minFixation = 0.0;
        this.maxFixation = 0.0;
        // Subscriptions
        this.labelLevelFacade.isEnabled$()
            .subscribe((value) => { this.isLabelLevelEnabled = value; });
        this.labelLevelFacade.getMinFixation$()
            .subscribe((value) => { this.minFixation = value; });
        this.labelLevelFacade.getMaxFixation$()
            .subscribe((value) => { this.maxFixation = value; });
    }
    ngOnInit() {
        var _a;
        // Subscriptions
        this.labelLevelFacade.getColor$((_a = this.label) === null || _a === void 0 ? void 0 : _a.fixationDuration)
            .subscribe((value) => { this.color = value; });
    }
}
LabelComponent.ɵfac = function LabelComponent_Factory(t) { return new (t || LabelComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_facade_label_level_label_level_facade__WEBPACK_IMPORTED_MODULE_0__.LabelLevelFacade)); };
LabelComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LabelComponent, selectors: [["app-label"]], inputs: { label: "label", isTitle: "isTitle" }, decls: 1, vars: 1, consts: [["id", "content", 3, "ngStyle", 4, "ngIf"], ["id", "content", 3, "ngStyle"], [3, "ngClass"]], template: function LabelComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, LabelComponent_div_0_Template, 3, 13, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.label);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgStyle, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass], styles: ["#content[_ngcontent-%COMP%] {\n  position: absolute;\n  display: inline-block;\n  border-left: 0.2px solid white;\n  background: white;\n}\n#content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  font-size: min(2vh, 1vw);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n#content[_ngcontent-%COMP%]   span.title[_ngcontent-%COMP%] {\n  font-size: min(3vh, 2vw);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxhYmVsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7RUFDQSxxQkFBQTtFQUNBLDhCQUFBO0VBRUEsaUJBQUE7QUFBSjtBQUVJO0VBQ0ksWUFBQTtFQUNBLFdBQUE7RUFDQSx3QkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBQVI7QUFHSTtFQUNJLHdCQUFBO0FBRFIiLCJmaWxlIjoibGFiZWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY29udGVudCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBib3JkZXItbGVmdDogMC4ycHggc29saWQgd2hpdGU7XHJcbiAgICAvL2JvcmRlci10b3A6IDAuMjVweCBzb2xpZCB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgXHJcbiAgICBzcGFuIHtcclxuICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgZm9udC1zaXplOiBtaW4oMnZoLCAxdncpO1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBzcGFuLnRpdGxlIHtcclxuICAgICAgICBmb250LXNpemU6IG1pbigzdmgsIDJ2dyk7XHJcbiAgICB9XHJcbn0gICBcclxuIl19 */"] });


/***/ }),

/***/ 7270:
/*!***********************************************************************!*\
  !*** ./src/app/components/loading-dialog/loading-dialog.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoadingDialogComponent": () => (/* binding */ LoadingDialogComponent),
/* harmony export */   "LoadingDialogContent": () => (/* binding */ LoadingDialogContent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 2213);
/* harmony import */ var src_app_facade_data_data_facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/facade/data/data.facade */ 1461);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/progress-spinner */ 181);




class LoadingDialogComponent {
    constructor(dialog, dataFacade) {
        this.dialog = dialog;
        this.dataFacade = dataFacade;
        this.dataFacade.isUpdating$().subscribe((isUpdating) => {
            if (isUpdating) {
                this.openDialog();
            }
            else {
                this.closeDialog();
            }
        });
    }
    /** Opens the dialog */
    openDialog() {
        this.dialog.open(LoadingDialogContent, { disableClose: true });
    }
    /** Closes the dialog */
    closeDialog() {
        this.dialog.closeAll();
    }
}
LoadingDialogComponent.ɵfac = function LoadingDialogComponent_Factory(t) { return new (t || LoadingDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_facade_data_data_facade__WEBPACK_IMPORTED_MODULE_0__.DataFacade)); };
LoadingDialogComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LoadingDialogComponent, selectors: [["app-loading-dialog"]], decls: 0, vars: 0, template: function LoadingDialogComponent_Template(rf, ctx) { }, encapsulation: 2 });
class LoadingDialogContent {
}
LoadingDialogContent.ɵfac = function LoadingDialogContent_Factory(t) { return new (t || LoadingDialogContent)(); };
LoadingDialogContent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LoadingDialogContent, selectors: [["loading-dialog-content"]], decls: 6, vars: 1, consts: [["mat-dialog-title", ""], ["mat-dialog-content", ""], ["id", "spinner-container"], ["color", "primary", 3, "diameter"]], template: function LoadingDialogContent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Loading data");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Please, have a moment of patiente");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "mat-spinner", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("diameter", 40);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogContent, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__.MatSpinner], styles: ["h1[_ngcontent-%COMP%] {\n  font-size: 1.5em;\n}\n\n#spinner-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin: 20px 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmctZGlhbG9nLWNvbnRlbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0FBQ0o7O0FBRUE7RUFDSSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0FBQ0oiLCJmaWxlIjoibG9hZGluZy1kaWFsb2ctY29udGVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaDEge1xyXG4gICAgZm9udC1zaXplOiAxLjVlbTtcclxufVxyXG5cclxuI3NwaW5uZXItY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIG1hcmdpbjogMjBweCAwO1xyXG59Il19 */"] });


/***/ }),

/***/ 9781:
/*!***************************************************************!*\
  !*** ./src/app/components/main-panel/main-panel.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainPanelComponent": () => (/* binding */ MainPanelComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _document_details_document_details_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../document-details/document-details.component */ 4733);
/* harmony import */ var _color_legend_color_legend_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color-legend/color-legend.component */ 9267);
/* harmony import */ var _document_document_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../document/document.component */ 7053);




class MainPanelComponent {
    constructor() { }
    ngOnInit() {
    }
}
MainPanelComponent.ɵfac = function MainPanelComponent_Factory(t) { return new (t || MainPanelComponent)(); };
MainPanelComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: MainPanelComponent, selectors: [["app-main-panel"]], decls: 4, vars: 0, template: function MainPanelComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-document-details");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-color-legend");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "app-document");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "footer");
    } }, directives: [_document_details_document_details_component__WEBPACK_IMPORTED_MODULE_0__.DocumentDetailsComponent, _color_legend_color_legend_component__WEBPACK_IMPORTED_MODULE_1__.ColorLegendComponent, _document_document_component__WEBPACK_IMPORTED_MODULE_2__.DocumentComponent], styles: ["[_nghost-%COMP%] {\n  flex-grow: 1;\n  overflow: hidden;\n  min-height: 2em;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  align-items: center;\n}\n\nfooter[_ngcontent-%COMP%] {\n  min-height: 5px;\n  height: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4tcGFuZWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtBQUNKOztBQUVBO0VBQ0ksZUFBQTtFQUNBLFdBQUE7QUFDSiIsImZpbGUiOiJtYWluLXBhbmVsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gICAgZmxleC1ncm93OiAxO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIG1pbi1oZWlnaHQ6IDJlbTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZmxleC13cmFwOiBub3dyYXA7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG5mb290ZXIge1xyXG4gICAgbWluLWhlaWdodDogNXB4O1xyXG4gICAgaGVpZ2h0OiA1cHg7XHJcbn0iXX0= */"] });


/***/ }),

/***/ 7525:
/*!***********************************************************!*\
  !*** ./src/app/components/menu-bar/menu-bar.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuBarComponent": () => (/* binding */ MenuBarComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tabs */ 9348);
/* harmony import */ var _data_tab_data_tab_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data-tab/data-tab.component */ 4984);
/* harmony import */ var _label_tab_label_tab_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../label-tab/label-tab.component */ 5045);
/* harmony import */ var _paragraph_tab_paragraph_tab_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../paragraph-tab/paragraph-tab.component */ 58);





class MenuBarComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
MenuBarComponent.ɵfac = function MenuBarComponent_Factory(t) { return new (t || MenuBarComponent)(); };
MenuBarComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: MenuBarComponent, selectors: [["app-menu-bar"]], decls: 7, vars: 0, consts: [["mat-align-tabs", "start", "dynamicHeight", ""], ["label", "Data"], ["label", "Label level"], ["label", "Paragraph level"]], template: function MenuBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-tab-group", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "app-data-tab");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "mat-tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "app-label-tab");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "app-paragraph-tab");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_tabs__WEBPACK_IMPORTED_MODULE_4__.MatTabGroup, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_4__.MatTab, _data_tab_data_tab_component__WEBPACK_IMPORTED_MODULE_0__.DataTabComponent, _label_tab_label_tab_component__WEBPACK_IMPORTED_MODULE_1__.LabelTabComponent, _paragraph_tab_paragraph_tab_component__WEBPACK_IMPORTED_MODULE_2__.ParagraphTabComponent], styles: ["[_nghost-%COMP%] {\n  flex-shrink: 0;\n  border-bottom: 1px grey solid;\n  min-height: 17vh;\n}\n\n  .mat-tab-label .mat-tab-label-content {\n  font-size: min(1vw, 4vh);\n}\n\n .mat-tab-label,  .mat-tab-label-active {\n  min-height: 0 !important;\n  height: 5vh !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbnUtYmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBQTtFQUNBLDZCQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFHQTtFQUNJLHdCQUFBO0FBQUo7O0FBR0E7RUFDSSx3QkFBQTtFQUNBLHNCQUFBO0FBQUoiLCJmaWxlIjoibWVudS1iYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICBmbGV4LXNocmluazogMDtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBncmV5IHNvbGlkO1xyXG4gICAgbWluLWhlaWdodDogMTd2aDtcclxufVxyXG5cclxuLy8gQW5ndWxhciBtYXRlcmlhbCBsYWJlbHNcclxuOjpuZy1kZWVwIC5tYXQtdGFiLWxhYmVsIC5tYXQtdGFiLWxhYmVsLWNvbnRlbnQge1xyXG4gICAgZm9udC1zaXplOiBtaW4oMXZ3LCA0dmgpO1xyXG59XHJcblxyXG46Om5nLWRlZXAubWF0LXRhYi1sYWJlbCwgOjpuZy1kZWVwLm1hdC10YWItbGFiZWwtYWN0aXZle1xyXG4gICAgbWluLWhlaWdodDogMCFpbXBvcnRhbnQ7XHJcbiAgICBoZWlnaHQ6IDV2aCFpbXBvcnRhbnQ7XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ 58:
/*!*********************************************************************!*\
  !*** ./src/app/components/paragraph-tab/paragraph-tab.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParagraphTabComponent": () => (/* binding */ ParagraphTabComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_facade_paragraph_level_paragraph_level_facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/facade/paragraph-level/paragraph-level.facade */ 4010);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4364);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/slide-toggle */ 2080);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/checkbox */ 4058);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 1707);






function ParagraphTabComponent_mat_checkbox_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-checkbox", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ParagraphTabComponent_mat_checkbox_2_Template_mat_checkbox_ngModelChange_0_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const feature_r1 = restoredCtx.$implicit; return feature_r1.enabled = $event; })("ngModelChange", function ParagraphTabComponent_mat_checkbox_2_Template_mat_checkbox_ngModelChange_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r4.updateAllEnabled(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const feature_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", feature_r1.enabled)("disabled", !ctx_r0.isEnabled)("ngModel", feature_r1.enabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", feature_r1.name, " ");
} }
class ParagraphTabComponent {
    constructor(parLevelFacade) {
        this.parLevelFacade = parLevelFacade;
        this.isEnabled = true;
        this.isParLevelStateUpdating = false;
        this.features = [];
        this.allFeaturesEnabled = false;
        // subscriptions 
        this.parLevelFacade.isEnabled$()
            .subscribe((value) => { this.isEnabled = value; });
        this.parLevelFacade.isUpdating$()
            .subscribe((value) => { this.isParLevelStateUpdating = value; });
        this.parLevelFacade.getFeaturesConf$()
            .subscribe((features) => { this.features = features; });
    }
    ngOnInit() {
    }
    /**
     * Some of the paragraph features are enabled.
     */
    get someFeaturesEnabled() {
        if (this.features == null) {
            return false;
        }
        return this.features.filter(f => f.enabled).length > 0 && !this.allFeaturesEnabled;
    }
    /**
     * Update the flag of 'all features enabled'.
     */
    updateAllEnabled() {
        this.allFeaturesEnabled = this.features != [] && this.features.every(f => f.enabled);
        this.updateFeaturesConf();
    }
    /**
     * Enable/disabled all paragraph features
     * @param enabled `true` if all features are to be enabled, `false` if all features
     * are to be disabled.
     */
    setAllFeatures(enabled) {
        this.allFeaturesEnabled = enabled;
        if (this.features != []) {
            this.features.forEach(f => f.enabled = enabled);
            this.updateFeaturesConf();
        }
    }
    /**
     * Enable/disabled the paragraph level
     * @param enable the paragraph level is enabled
     */
    setParLevelEnabled(enable) {
        this.parLevelFacade.setDisabled(enable);
    }
    /** Update the feature configuration */
    updateFeaturesConf() {
        this.parLevelFacade.setFeaturesConf(this.features);
    }
}
ParagraphTabComponent.ɵfac = function ParagraphTabComponent_Factory(t) { return new (t || ParagraphTabComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_facade_paragraph_level_paragraph_level_facade__WEBPACK_IMPORTED_MODULE_0__.ParagraphLevelFacade)); };
ParagraphTabComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ParagraphTabComponent, selectors: [["app-paragraph-tab"]], decls: 13, vars: 5, consts: [["id", "feature-pool"], ["id", "features-container"], ["class", "example-margin", "color", "primary", 3, "checked", "disabled", "ngModel", "ngModelChange", 4, "ngFor", "ngForOf"], ["id", "button-container"], ["id", "toggle-container"], ["color", "primary", 3, "checked", "change"], ["color", "primary", 1, "example-margin", 3, "checked", "disabled", "indeterminate", "change"], ["color", "primary", 1, "example-margin", 3, "checked", "disabled", "ngModel", "ngModelChange"]], template: function ParagraphTabComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, ParagraphTabComponent_mat_checkbox_2_Template, 2, 4, "mat-checkbox", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "section", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Off");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-slide-toggle", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ParagraphTabComponent_Template_mat_slide_toggle_change_7_listener($event) { return ctx.setParLevelEnabled($event.checked); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "On");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "mat-checkbox", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ParagraphTabComponent_Template_mat_checkbox_change_11_listener($event) { return ctx.setAllFeatures($event.checked); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, " All features ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.features);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", ctx.isEnabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", ctx.allFeaturesEnabled)("disabled", !ctx.isEnabled)("indeterminate", ctx.someFeaturesEnabled);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_3__.MatSlideToggle, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__.MatCheckbox, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel], styles: ["[_nghost-%COMP%] {\n  display: flex;\n  overflow: hidden;\n  font-size: min(1vw, 1.6vh);\n}\n\nsection[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding-top: 5px;\n}\n\nsection#feature-pool[_ngcontent-%COMP%] {\n  flex-grow: 4;\n  padding-left: 7px;\n}\n\nsection#feature-pool[_ngcontent-%COMP%]   #features-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  margin: 1vh 0 0 0;\n}\n\nsection#feature-pool[_ngcontent-%COMP%]   #features-container[_ngcontent-%COMP%]   .mat-checkbox[_ngcontent-%COMP%] {\n  margin: 0 1vw;\n  flex: 0 1 14%;\n}\n\nsection#button-container[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  align-items: center;\n}\n\nsection#button-container[_ngcontent-%COMP%]   #toggle-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-grow: 1;\n  flex-basis: auto;\n  padding: 1vh 1vw;\n}\n\nsection#button-container[_ngcontent-%COMP%]   #toggle-container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  padding: 0px 2px 0px 2px;\n  margin: 0 1vw;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcmFncmFwaC10YWIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSwwQkFBQTtBQUNKOztBQUVBO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7RUFDQSxpQkFBQTtBQUNKOztBQUNJO0VBQ0ksYUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQUNSOztBQUNRO0VBQ0ksYUFBQTtFQUNBLGFBQUE7QUFDWjs7QUFJQTtFQUNJLFlBQUE7RUFDQSxtQkFBQTtBQURKOztBQUdJO0VBQ0ksYUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBRFI7O0FBR1E7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSx3QkFBQTtFQUNBLGFBQUE7QUFEViIsImZpbGUiOiJwYXJhZ3JhcGgtdGFiLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBmb250LXNpemU6IG1pbigxdncsIDEuNnZoKTtcclxufVxyXG5cclxuc2VjdGlvbiB7ICAgIFxyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBwYWRkaW5nLXRvcDogNXB4O1xyXG59XHJcblxyXG5zZWN0aW9uI2ZlYXR1cmUtcG9vbCB7XHJcbiAgICBmbGV4LWdyb3c6IDQ7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDdweDtcclxuXHJcbiAgICAjZmVhdHVyZXMtY29udGFpbmVyIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcclxuICAgICAgICBtYXJnaW46IDF2aCAwIDAgMDtcclxuICAgICAgICBcclxuICAgICAgICAubWF0LWNoZWNrYm94IHtcclxuICAgICAgICAgICAgbWFyZ2luOiAwIDF2dztcclxuICAgICAgICAgICAgZmxleDogMCAxIDE0JVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuc2VjdGlvbiNidXR0b24tY29udGFpbmVyIHtcclxuICAgIGZsZXgtZ3JvdzogMTtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgI3RvZ2dsZS1jb250YWluZXIge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1ncm93OiAxO1xyXG4gICAgICAgIGZsZXgtYmFzaXM6IGF1dG87XHJcbiAgICAgICAgcGFkZGluZzogMXZoIDF2dztcclxuICAgICAgXHJcbiAgICAgICAgbGFiZWwge1xyXG4gICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgICAgcGFkZGluZzogMHB4IDJweCAwcHggMnB4O1xyXG4gICAgICAgICAgbWFyZ2luOiAwIDF2dztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0= */"] });


/***/ }),

/***/ 3343:
/*!*************************************************************!*\
  !*** ./src/app/components/paragraph/paragraph.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParagraphComponent": () => (/* binding */ ParagraphComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_facade_paragraph_level_paragraph_level_facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/facade/paragraph-level/paragraph-level.facade */ 4010);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4364);
/* harmony import */ var _label_label_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../label/label.component */ 108);




const _c0 = function (a0, a1, a2, a3, a4, a5) { return { "top.%": a0, "left.%": a1, "width.%": a2, "max-width.%": a3, "height.%": a4, "max-height.%": a5 }; };
function ParagraphComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "div", 5);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction6"](1, _c0, 100 * ctx_r0.paragraph.y1, 100 * ctx_r0.paragraph.x1, 100 * ctx_r0.paragraph.width, 100 * ctx_r0.paragraph.width, 100 * ctx_r0.paragraph.height * ctx_r0.HEIGHT_REDUCTION, 100 * ctx_r0.paragraph.height * ctx_r0.HEIGHT_REDUCTION));
} }
function ParagraphComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction6"](2, _c0, 100 * ctx_r1.paragraph.y1, 100 * (ctx_r1.paragraph.x1 - ctx_r1.paragraph.width * ctx_r1.WIDTH_REDUCTION_F) - ctx_r1.MARGIN, 100 * ctx_r1.paragraph.width * ctx_r1.WIDTH_REDUCTION_F, 100 * ctx_r1.paragraph.width * ctx_r1.WIDTH_REDUCTION_F, ctx_r1.ID_HEIGHT, ctx_r1.ID_HEIGHT));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Paragraph ", ctx_r1.paragraph.id, "");
} }
function ParagraphComponent_div_2_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const feature_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", feature_r6.units ? feature_r6.name + " (" + feature_r6.units + ")" : feature_r6.name, ": ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](5, 2, ctx_r7.paragraph.getFeatureById(feature_r6.id) * feature_r6.transform, "0.1-2"), " ");
} }
function ParagraphComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ParagraphComponent_div_2_div_1_div_1_Template, 6, 5, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const feature_r6 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", feature_r6.enabled && ctx_r5.paragraph.getFeatureById(feature_r6.id) != -1);
} }
function ParagraphComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ParagraphComponent_div_2_div_1_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction6"](2, _c0, 100 * ctx_r2.paragraph.y1 + ctx_r2.ID_HEIGHT, 100 * (ctx_r2.paragraph.x1 - ctx_r2.paragraph.width * ctx_r2.WIDTH_REDUCTION_F) - ctx_r2.MARGIN, 100 * ctx_r2.paragraph.width * ctx_r2.WIDTH_REDUCTION_F, 100 * ctx_r2.paragraph.width * ctx_r2.WIDTH_REDUCTION_F, 100 * ctx_r2.paragraph.height * ctx_r2.HEIGHT_REDUCTION - ctx_r2.ID_HEIGHT, 100 * ctx_r2.paragraph.height * ctx_r2.HEIGHT_REDUCTION - ctx_r2.ID_HEIGHT));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.featuresConf);
} }
function ParagraphComponent_div_3_span_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " \u2713 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ParagraphComponent_div_3_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " \u2715 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ParagraphComponent_div_3_div_18_span_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " \u2713 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ParagraphComponent_div_3_div_18_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " \u2715 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
const _c1 = function (a0) { return { "opacity.%": a0 }; };
function ParagraphComponent_div_3_div_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Predicted relevance:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, ParagraphComponent_div_3_div_18_span_10_Template, 2, 0, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, ParagraphComponent_div_3_div_18_ng_template_11_Template, 2, 0, "ng-template", null, 26, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](12);
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](8, _c1, ctx_r12.predictedRelevanceOpacity));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](5, 5, ctx_r12.paragraph.predictedRelevance[0], "1.1-2"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r12.paragraph.predictedRelevance[1] ? "True" : "False");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r12.paragraph.perceivedRelevance == ctx_r12.paragraph.predictedRelevance[1])("ngIfElse", _r14);
} }
function ParagraphComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "System relevance:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Perceived relevance:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, ParagraphComponent_div_3_span_15_Template, 2, 0, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, ParagraphComponent_div_3_ng_template_16_Template, 2, 0, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, ParagraphComponent_div_3_div_18_Template, 13, 10, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](17);
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction6"](6, _c0, 100 * ctx_r3.paragraph.y1, 100 * ctx_r3.paragraph.x2 + ctx_r3.MARGIN, 100 * ctx_r3.paragraph.width * ctx_r3.WIDTH_REDUCTION_R, 100 * ctx_r3.paragraph.width * ctx_r3.WIDTH_REDUCTION_R, 100 * ctx_r3.paragraph.height * ctx_r3.HEIGHT_REDUCTION - ctx_r3.ID_HEIGHT, 100 * ctx_r3.paragraph.height * ctx_r3.HEIGHT_REDUCTION - ctx_r3.ID_HEIGHT));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.paragraph.systemRelevance ? "True" : "False");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.paragraph.perceivedRelevance ? "True " : "False");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.paragraph.systemRelevance == ctx_r3.paragraph.perceivedRelevance)("ngIfElse", _r10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.paragraph.hasFeatures);
} }
function ParagraphComponent_span_4_app_label_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-label", 29);
} if (rf & 2) {
    const lbl_r17 = ctx.$implicit;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("label", lbl_r17)("isTitle", ctx_r16.paragraph.isTitle);
} }
function ParagraphComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ParagraphComponent_span_4_app_label_1_Template, 1, 2, "app-label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r4.paragraph.labels);
} }
class ParagraphComponent {
    constructor(parLevelFacade) {
        this.parLevelFacade = parLevelFacade;
        // Constants
        this.ID_HEIGHT = 4; // in %
        this.MARGIN = 4; // in %
        this.COLORBAR_WIDTH = 1.1; // in %
        this.HEIGHT_REDUCTION = 0.95;
        this.WIDTH_REDUCTION_F = 0.5;
        this.WIDTH_REDUCTION_R = 0.6;
        this.color = "lightgrey";
        this.isParLevelEnabled = true;
        this.featuresConf = [];
        // Subscriptions
        this.parLevelFacade.isEnabled$()
            .subscribe((value) => { this.isParLevelEnabled = value; });
        this.parLevelFacade.getFeaturesConf$()
            .subscribe((featuresConf) => { this.featuresConf = featuresConf; });
    }
    ngOnInit() {
    }
    /**
     * Determines if there are visible features.
     */
    get areVisibleFeatures() {
        let anyVisible = false;
        this.featuresConf.forEach((f) => {
            var _a;
            if (f.enabled && ((_a = this.paragraph) === null || _a === void 0 ? void 0 : _a.getFeatureById(f.id)) != null) {
                anyVisible = true;
            }
        });
        return anyVisible;
    }
    /**
     * Compute the opacity of the predicted relevance.
     */
    get predictedRelevanceOpacity() {
        if (this.paragraph)
            return 40 + 120 * Math.abs(this.paragraph.predictedRelevance[0] - 0.5);
        return 100;
    }
}
ParagraphComponent.ɵfac = function ParagraphComponent_Factory(t) { return new (t || ParagraphComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_facade_paragraph_level_paragraph_level_facade__WEBPACK_IMPORTED_MODULE_0__.ParagraphLevelFacade)); };
ParagraphComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ParagraphComponent, selectors: [["app-paragraph"]], inputs: { paragraph: "paragraph" }, decls: 5, vars: 5, consts: [["class", "paragraph", 3, "ngStyle", 4, "ngIf"], ["class", "paragraph-id", 3, "ngStyle", 4, "ngIf"], ["class", "paragraph-features", 3, "ngStyle", 4, "ngIf"], ["class", "paragraph-relevance", 3, "ngStyle", 4, "ngIf"], ["class", "labels-container", 4, "ngIf"], [1, "paragraph", 3, "ngStyle"], [1, "paragraph-id", 3, "ngStyle"], [1, "paragraph-features", 3, "ngStyle"], [4, "ngFor", "ngForOf"], ["class", "feature", 4, "ngIf"], [1, "feature"], [1, "feature-name"], [1, "feature-value"], [1, "paragraph-relevance", 3, "ngStyle"], [1, "relevance-container"], [1, "relevance"], [1, "relevance-name"], [1, "badge", "tf-badge"], [1, "badge-placeholder"], [1, "circular-badge-container"], ["class", "badge circular-badge match-badge", 4, "ngIf", "ngIfElse"], ["perceivedUnmatch", ""], ["class", "relevance", 4, "ngIf"], [1, "badge", "circular-badge", "match-badge"], [1, "badge", "circular-badge", "unmatch-badge"], [1, "badge", "probability-badge", 3, "ngStyle"], ["predictedUnmatch", ""], [1, "labels-container"], [3, "label", "isTitle", 4, "ngFor", "ngForOf"], [3, "label", "isTitle"]], template: function ParagraphComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, ParagraphComponent_div_0_Template, 1, 8, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ParagraphComponent_div_1_Template, 3, 9, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, ParagraphComponent_div_2_Template, 2, 9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, ParagraphComponent_div_3_Template, 19, 13, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, ParagraphComponent_span_4_Template, 2, 1, "span", 4);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.paragraph && ctx.paragraph.hasLabels);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isParLevelEnabled && ctx.paragraph && !ctx.paragraph.isTitle && ctx.paragraph.hasLabels);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isParLevelEnabled && ctx.paragraph && !ctx.paragraph.isTitle && ctx.paragraph.hasLabels);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isParLevelEnabled && ctx.paragraph && !ctx.paragraph.isTitle && ctx.paragraph.hasLabels);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.paragraph && ctx.paragraph.hasLabels);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgStyle, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _label_label_component__WEBPACK_IMPORTED_MODULE_1__.LabelComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.DecimalPipe], styles: ["html[_ngcontent-%COMP%], body[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  max-width: 100%;\n  padding: 0;\n  margin: 0;\n  overflow: hidden;\n}\nbody[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\nhtml[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n@media screen and (min-width: 1800px) {\n  html[_ngcontent-%COMP%] {\n    font-size: calc(13px + 6 * ((100vw - 1800px) / 400));\n  }\n}\n\n\n\n\n\n\n*[_ngcontent-%COMP%]::-webkit-scrollbar, *[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  width: 15px;\n  border-radius: 13px;\n  background-clip: padding-box;\n  border: 5px solid transparent;\n  background-color: white;\n}\n*[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  box-shadow: inset 0 0 0 10px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  box-shadow: none;\n  background-color: white;\n}\n\n.success[_ngcontent-%COMP%] {\n  color: white;\n  background-color: rgba(30, 155, 53, 0.671) !important;\n}\n.success[_ngcontent-%COMP%]   .mat-button-wrapper[_ngcontent-%COMP%] {\n  color: white;\n}\n.error[_ngcontent-%COMP%] {\n  color: white;\n  background-color: #c43404 !important;\n}\n.error[_ngcontent-%COMP%]   .mat-button-wrapper[_ngcontent-%COMP%] {\n  color: white;\n}\n\n  .mat-stroked-button {\n  width: 4vw !important;\n  height: 4vh !important;\n  min-width: -webkit-fit-content;\n  min-width: -moz-fit-content;\n  min-width: fit-content;\n  font-size: 1em;\n}\n\n@media screen and (min-width: 2000px) {\n  .mat-slide-toggle[_ngcontent-%COMP%] {\n    transform: scale(1.4);\n  }\n}\n\n  .mat-slider-horizontal {\n  min-width: 8vw;\n}\n\n@media screen and (min-width: 2000px) {\n  .mat-checkbox-inner-container[_ngcontent-%COMP%] {\n    transform: scale(1.4);\n  }\n}\n@media screen and (min-width: 2000px) {\n  .mat-snack-bar-container[_ngcontent-%COMP%] {\n    transform: scale(1.4) !important;\n  }\n}\n\n  .mat-form-field-infix {\n  border-top: 0.4375em solid transparent;\n}\n.paragraph[_ngcontent-%COMP%], .fixation-duration-bar[_ngcontent-%COMP%], .paragraph-id[_ngcontent-%COMP%], .paragraph-features[_ngcontent-%COMP%], .paragraph-relevance[_ngcontent-%COMP%] {\n  position: absolute;\n  display: inline-block;\n}\n.paragraph-id[_ngcontent-%COMP%], .paragraph-features[_ngcontent-%COMP%] {\n  background: white;\n  color: rgba(0, 0, 0, 0);\n  text-shadow: 0 0 black;\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);\n  transition: color 0.3s ease;\n}\n.paragraph-id[_ngcontent-%COMP%] {\n  font-weight: 500;\n  text-align: center;\n  background-color: #f0efef;\n  border: 0.5px solid rgba(187, 183, 183, 0.9);\n  border-bottom-width: 2px;\n  z-index: 2;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.paragraph-features[_ngcontent-%COMP%] {\n  flex-direction: column;\n  overflow-x: hidden;\n  overflow-y: auto;\n  height: 100%;\n  border: 0.5px solid rgba(187, 183, 183, 0.9);\n  border-top: none;\n  z-index: 1;\n}\n.paragraph-features[_ngcontent-%COMP%]   .feature[_ngcontent-%COMP%] {\n  margin: 5px 3px;\n  padding: 5px 0;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  border-bottom: 3px solid rgba(187, 183, 183, 0.2);\n}\n.paragraph-features[_ngcontent-%COMP%]   .feature[_ngcontent-%COMP%]   .feature-name[_ngcontent-%COMP%] {\n  flex-grow: 4;\n  margin-left: 0.3vw;\n}\n.paragraph-features[_ngcontent-%COMP%]   .feature[_ngcontent-%COMP%]   .feature-value[_ngcontent-%COMP%] {\n  font-weight: 500;\n  margin: 0 4px 0 6px;\n  text-align: right;\n  flex-grow: 1;\n}\n.paragraph-features[_ngcontent-%COMP%]:hover {\n  color: rgba(0, 0, 0, 0.3);\n}\n.paragraph-relevance[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: left;\n  flex-direction: column;\n}\n.paragraph-relevance[_ngcontent-%COMP%]   .relevance-container[_ngcontent-%COMP%] {\n  width: 100%;\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);\n}\n.paragraph-relevance[_ngcontent-%COMP%]   .relevance-container[_ngcontent-%COMP%]   .relevance[_ngcontent-%COMP%] {\n  margin: 0.5vh 0.1vw 0.5vh 0.5vw;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n.paragraph-relevance[_ngcontent-%COMP%]   .relevance-container[_ngcontent-%COMP%]   .relevance[_ngcontent-%COMP%]   .relevance-name[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  text-align: left;\n}\n.badge[_ngcontent-%COMP%], .badge-placeholder[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 35px;\n  padding: 0 0.6vw;\n  margin: 0.6vh 0.2vw;\n  background-color: white;\n  color: white;\n  font-size: 0.95em;\n}\n.tf-badge[_ngcontent-%COMP%] {\n  width: 12%;\n  max-width: 12%;\n  background-color: #f0efef;\n  color: black;\n}\n.probability-badge[_ngcontent-%COMP%] {\n  background-color: #cbe2f9;\n  color: #0b5cad;\n}\n.circular-badge-container[_ngcontent-%COMP%] {\n  position: relative;\n}\n.circular-badge-container[_ngcontent-%COMP%]   .circular-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0%;\n  bottom: 50%;\n  width: 1.1vw;\n  height: 1.1vw;\n  border-radius: 50%;\n  padding: 0;\n  font-size: 0.6em;\n}\n.match-badge[_ngcontent-%COMP%] {\n  background-color: #80f0b3;\n  color: #1e9b35;\n}\n.unmatch-badge[_ngcontent-%COMP%] {\n  background-color: #f08585;\n  color: #b30606;\n}\n*[_ngcontent-%COMP%]::-webkit-scrollbar, *[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  width: 15px;\n  border-radius: 13px;\n  background-clip: padding-box;\n  border: 5px solid transparent;\n  background-color: white;\n}\n*[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  box-shadow: inset 0 0 0 10px;\n}\n[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  box-shadow: none;\n  background-color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHN0eWxlcy5zY3NzIiwicGFyYWdyYXBoLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhFQUFBO0FBRUE7RUFDSSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0FDQUo7QURHQTtFQUNJLFNBQUE7RUFDQSxpREFBQTtBQ0FKO0FER0E7RUFDSSxlQUFBO0FDQUo7QURHQTtFQUNJO0lBQ0Usb0RBQUE7RUNBSjtBQUNGO0FESUEsbUNBQUE7QUFVQSxhQUFBO0FBWUEsYUFBQTtBQVlBLGFBQUE7QUFZQSxrQkFBQTtBQVlBLDZCQUFBO0FBRUE7O0VBRUUsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLHVCQUFBO0FDeERGO0FEMkRBO0VBQ0UsNEJBQUE7QUN4REY7QUQyREE7RUFDSSxnQkFBQTtFQUNBLHVCQUFBO0FDeERKO0FEMkRBLG1DQUFBO0FBQ0E7RUFDSSxZQUFBO0VBQ0EscURBQUE7QUN4REo7QUQwREk7RUFDSSxZQUFBO0FDeERSO0FENERBO0VBQ0ksWUFBQTtFQUNBLG9DQUFBO0FDekRKO0FEMkRJO0VBQ0ksWUFBQTtBQ3pEUjtBRDhEQSxzQ0FBQTtBQUdJO0VBQ0kscUJBQUE7RUFDQSxzQkFBQTtFQUNBLDhCQUFBO0VBQUEsMkJBQUE7RUFBQSxzQkFBQTtFQUNBLGNBQUE7QUM3RFI7QURrRUEsZ0NBQUE7QUFFQTtFQUNJO0lBQ0kscUJBQUE7RUNoRU47QUFDRjtBRG9FQSxtQ0FBQTtBQUdJO0VBQ0ksY0FBQTtBQ3BFUjtBRHlFQSxnQ0FBQTtBQUVBO0VBQ0k7SUFDSSxxQkFBQTtFQ3ZFTjtBQUNGO0FEMEVBO0VBQ0k7SUFDSSxnQ0FBQTtFQ3hFTjtBQUNGO0FENEVBLHVDQUFBO0FBR0k7RUFDSSxzQ0FBQTtBQzVFUjtBQWhHQTtFQUNJLGtCQUFBO0VBQ0EscUJBQUE7QUFtR0o7QUEvRkE7RUFDSSxpQkFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSx3Q0FBQTtFQUNBLDJCQUFBO0FBa0dKO0FBL0ZBO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlCRGVjO0VDZGQsNENBQUE7RUFDQSx3QkFBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQWtHSjtBQS9GQTtFQUNJLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSw0Q0FBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtBQWtHSjtBQWhHSTtFQUNJLGVBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpREFBQTtBQWtHUjtBQWhHUTtFQUNJLFlBQUE7RUFDQSxrQkFBQTtBQWtHWjtBQS9GUTtFQUNJLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7QUFpR1o7QUE1RkE7RUFDSSx5QkFBQTtBQStGSjtBQTVGQTtFQUNJLGFBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7QUErRko7QUE3Rkk7RUFDSSxXQUFBO0VBRUEsd0NBQUE7QUE4RlI7QUE1RlE7RUFDSSwrQkFBQTtFQUNBLGFBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0FBOEZaO0FBNUZZO0VBQ0ksWUFBQTtFQUNBLGdCQUFBO0FBOEZoQjtBQXZGQTtFQUNJLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUEwRko7QUF0RkE7RUFDSSxVQUFBO0VBQ0EsY0FBQTtFQUNBLHlCRHZFYztFQ3dFZCxZQUFBO0FBeUZKO0FBdEZBO0VBQ0kseUJBQUE7RUFDQSxjQUFBO0FBeUZKO0FBdEZBO0VBQ0ksa0JBQUE7QUF5Rko7QUF2Rkk7RUFDSSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtBQXlGUjtBQXJGQTtFQUNJLHlCRG5HdUI7RUNvR3ZCLGNEckdpQjtBQzZMckI7QUFyRkE7RUFDSSx5QkR0R21CO0VDdUduQixjRHhHYTtBQ2dNakI7QUFyRkE7O0VBRUUsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsNEJBQUE7RUFDQSw2QkFBQTtFQUNBLHVCQUFBO0FBd0ZGO0FBckZBO0VBQ0UsNEJBQUE7QUF3RkY7QUFwRkE7RUFDSSxnQkFBQTtFQUNBLHVCQUFBO0FBdUZKIiwiZmlsZSI6InBhcmFncmFwaC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFlvdSBjYW4gYWRkIGdsb2JhbCBzdHlsZXMgdG8gdGhpcyBmaWxlLCBhbmQgYWxzbyBpbXBvcnQgb3RoZXIgc3R5bGUgZmlsZXMgKi9cclxuXHJcbmh0bWwsIGJvZHkgeyBcclxuICAgIGhlaWdodDogMTAwJTsgXHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG5ib2R5IHsgXHJcbiAgICBtYXJnaW46IDA7IFxyXG4gICAgZm9udC1mYW1pbHk6IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmOyBcclxufVxyXG5cclxuaHRtbCB7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDE4MDBweCkge1xyXG4gICAgaHRtbCB7XHJcbiAgICAgIGZvbnQtc2l6ZTogY2FsYygxM3B4ICsgNiAqICgoMTAwdncgLSAxODAwcHgpIC8gNDAwKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKioqKioqKiBDT0xPUiBQQUxFVFRFICoqKioqKioqKioqKi9cclxuXHJcbiRwcmltYXJ5OiByZ2IoNjMgODEgMTgxKTtcclxuJGdyZWVuLWNvcnJlY3QtdGV4dDogcmdiYSgzMCwgMTU1LCA1Myk7XHJcbiRncmVlbi1jb3JyZWN0LWJhY2tncm91bmQ6IHJnYigxMjgsIDI0MCwgMTc5KTtcclxuJHJlZC1lcnJvci10ZXh0OiByZ2IoMTc5LCA2LCA2KTtcclxuJHJlZC1lcnJvci1iYWNrZ3JvdW5kOiByZ2IoMjQwLCAxMzMsIDEzMyk7XHJcbiRncmV5LWJhY2tncm91bmQ6IHJnYigyNDAsIDIzOSwgMjM5LCAxKTtcclxuJGdyZXktYm9yZGVyOnJnYmEoMTg3LCAxODMsIDE4MywgMC45KTtcclxuXHJcbi8qIFNDU1MgSEVYICovXHJcbiRsYXZlbmRlci13ZWI6ICAgICAgICNkZmRlZjdmZjtcclxuJHBlcml3aW5rbGUtY3JheW9sYTogI2M4ZDVmMmZmO1xyXG4kbGlnaHQtc3RlZWwtYmx1ZTogICAjYjFjY2VkZmY7XHJcbiRtaWRkbGUtYmx1ZS1ncmVlbjogICNhMWQ2YzZmZjtcclxuJGdyYW5ueS1zbWl0aC1hcHBsZTogIzkwZTA5ZmZmO1xyXG4kc3RyYXc6ICAgICAgICAgICAgICAjZDZjZDVmZmY7XHJcbiRzdW5yYXk6ICAgICAgICAgICAgICNkOGFiNTZmZjtcclxuJHJhdy1zaWVubmE6ICAgICAgICAgI2UxODEzZmZmO1xyXG4kZmxhbWU6ICAgICAgICAgICAgICAjZTk1NzI3ZmY7XHJcbiRyZWQtcnliOiAgICAgICAgICAgICNmZjQwMWZmZjtcclxuXHJcbi8qIFNDU1MgSFNMICovXHJcbiRsYXZlbmRlci13ZWI6IGhzbGEoMjQyLCA2MSUsIDkyJSwgMSk7XHJcbiRwZXJpd2lua2xlLWNyYXlvbGE6IGhzbGEoMjIxLCA2MiUsIDg3JSwgMSk7XHJcbiRsaWdodC1zdGVlbC1ibHVlOiBoc2xhKDIxMywgNjMlLCA4MSUsIDEpO1xyXG4kbWlkZGxlLWJsdWUtZ3JlZW46IGhzbGEoMTYyLCAzOSUsIDc0JSwgMSk7XHJcbiRncmFubnktc21pdGgtYXBwbGU6IGhzbGEoMTMxLCA1NiUsIDcyJSwgMSk7XHJcbiRzdHJhdzogaHNsYSg1NSwgNTklLCA2MSUsIDEpO1xyXG4kc3VucmF5OiBoc2xhKDM5LCA2MyUsIDU5JSwgMSk7XHJcbiRyYXctc2llbm5hOiBoc2xhKDI0LCA3MyUsIDU2JSwgMSk7XHJcbiRmbGFtZTogaHNsYSgxNSwgODIlLCA1MyUsIDEpO1xyXG4kcmVkLXJ5YjogaHNsYSg5LCAxMDAlLCA1NiUsIDEpO1xyXG5cclxuLyogU0NTUyBSR0IgKi9cclxuJGxhdmVuZGVyLXdlYjogcmdiYSgyMjMsIDIyMiwgMjQ3LCAxKTtcclxuJHBlcml3aW5rbGUtY3JheW9sYTogcmdiYSgyMDAsIDIxMywgMjQyLCAxKTtcclxuJGxpZ2h0LXN0ZWVsLWJsdWU6IHJnYmEoMTc3LCAyMDQsIDIzNywgMSk7XHJcbiRtaWRkbGUtYmx1ZS1ncmVlbjogcmdiYSgxNjEsIDIxNCwgMTk4LCAxKTtcclxuJGdyYW5ueS1zbWl0aC1hcHBsZTogcmdiYSgxNDQsIDIyNCwgMTU5LCAxKTtcclxuJHN0cmF3OiByZ2JhKDIxNCwgMjA1LCA5NSwgMSk7XHJcbiRzdW5yYXk6IHJnYmEoMjE2LCAxNzEsIDg2LCAxKTtcclxuJHJhdy1zaWVubmE6IHJnYmEoMjI1LCAxMjksIDYzLCAxKTtcclxuJGZsYW1lOiByZ2JhKDIzMywgODcsIDM5LCAxKTtcclxuJHJlZC1yeWI6IHJnYmEoMjU1LCA2NCwgMzEsIDEpO1xyXG5cclxuLyogU0NTUyBHcmFkaWVudCAqL1xyXG4kZ3JhZGllbnQtdG9wOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LXJpZ2h0OiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNkZmRlZjdmZiwgI2M4ZDVmMmZmLCAjYjFjY2VkZmYsICNhMWQ2YzZmZiwgIzkwZTA5ZmZmLCAjZDZjZDVmZmYsICNkOGFiNTZmZiwgI2UxODEzZmZmLCAjZTk1NzI3ZmYsICNmZjQwMWZmZik7XHJcbiRncmFkaWVudC1ib3R0b206IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNkZmRlZjdmZiwgI2M4ZDVmMmZmLCAjYjFjY2VkZmYsICNhMWQ2YzZmZiwgIzkwZTA5ZmZmLCAjZDZjZDVmZmYsICNkOGFiNTZmZiwgI2UxODEzZmZmLCAjZTk1NzI3ZmYsICNmZjQwMWZmZik7XHJcbiRncmFkaWVudC1sZWZ0OiBsaW5lYXItZ3JhZGllbnQoMjcwZGVnLCAjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG4kZ3JhZGllbnQtdG9wLXJpZ2h0OiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNkZmRlZjdmZiwgI2M4ZDVmMmZmLCAjYjFjY2VkZmYsICNhMWQ2YzZmZiwgIzkwZTA5ZmZmLCAjZDZjZDVmZmYsICNkOGFiNTZmZiwgI2UxODEzZmZmLCAjZTk1NzI3ZmYsICNmZjQwMWZmZik7XHJcbiRncmFkaWVudC1ib3R0b20tcmlnaHQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNkZmRlZjdmZiwgI2M4ZDVmMmZmLCAjYjFjY2VkZmYsICNhMWQ2YzZmZiwgIzkwZTA5ZmZmLCAjZDZjZDVmZmYsICNkOGFiNTZmZiwgI2UxODEzZmZmLCAjZTk1NzI3ZmYsICNmZjQwMWZmZik7XHJcbiRncmFkaWVudC10b3AtbGVmdDogbGluZWFyLWdyYWRpZW50KDIyNWRlZywgI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuJGdyYWRpZW50LWJvdHRvbS1sZWZ0OiBsaW5lYXItZ3JhZGllbnQoMzE1ZGVnLCAjZGZkZWY3ZmYsICNjOGQ1ZjJmZiwgI2IxY2NlZGZmLCAjYTFkNmM2ZmYsICM5MGUwOWZmZiwgI2Q2Y2Q1ZmZmLCAjZDhhYjU2ZmYsICNlMTgxM2ZmZiwgI2U5NTcyN2ZmLCAjZmY0MDFmZmYpO1xyXG4kZ3JhZGllbnQtcmFkaWFsOiByYWRpYWwtZ3JhZGllbnQoI2RmZGVmN2ZmLCAjYzhkNWYyZmYsICNiMWNjZWRmZiwgI2ExZDZjNmZmLCAjOTBlMDlmZmYsICNkNmNkNWZmZiwgI2Q4YWI1NmZmLCAjZTE4MTNmZmYsICNlOTU3MjdmZiwgI2ZmNDAxZmZmKTtcclxuXHJcblxyXG4vKioqKioqKiBTQ1JPTExCQVIgKioqKioqKioqKi9cclxuXHJcbio6Oi13ZWJraXQtc2Nyb2xsYmFyLFxyXG4qOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcbiAgd2lkdGg6IDE1cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTNweDtcclxuICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xyXG4gIGJvcmRlcjogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4qOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7ICAgICAgICBcclxuICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAxMHB4O1xyXG59XHJcblxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcclxuICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLyoqKioqKioqKiBOT1RJRklDQVRJT05TICoqKioqKioqKiovXHJcbi5zdWNjZXNzIHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzAsIDE1NSwgNTMsIDAuNjcxKSFpbXBvcnRhbnQ7XHJcblxyXG4gICAgLm1hdC1idXR0b24td3JhcHBlciB7XHJcbiAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG4uZXJyb3Ige1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5NiwgNTIsIDQpIWltcG9ydGFudDtcclxuXHJcbiAgICAubWF0LWJ1dHRvbi13cmFwcGVyIHtcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKioqKioqKioqKiogQlVUVE9OUyAqKioqKioqKioqKioqKioqKi9cclxuXHJcbjo6bmctZGVlcCB7XHJcbiAgICAubWF0LXN0cm9rZWQtYnV0dG9uIHtcclxuICAgICAgICB3aWR0aDogNHZ3IWltcG9ydGFudDtcclxuICAgICAgICBoZWlnaHQ6IDR2aCFpbXBvcnRhbnQ7XHJcbiAgICAgICAgbWluLXdpZHRoOmZpdC1jb250ZW50O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMWVtO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqKioqKioqKiogVE9HTEVTICoqKioqKioqKioqKiovXHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAyMDAwcHgpIHtcclxuICAgIC5tYXQtc2xpZGUtdG9nZ2xlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XHJcbiAgICB9ICAgIFxyXG59XHJcblxyXG5cclxuLyoqKioqKioqKiBTTElERVJTICoqKioqKioqKioqKioqKiovXHJcblxyXG46Om5nLWRlZXAge1xyXG4gICAgLm1hdC1zbGlkZXItaG9yaXpvbnRhbCB7XHJcbiAgICAgICAgbWluLXdpZHRoOiA4dnc7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKioqKioqKioqIENIRUNLQk9YICoqKioqKioqKioqKi9cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDIwMDBweCkge1xyXG4gICAgLm1hdC1jaGVja2JveC1pbm5lci1jb250YWluZXIge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcclxuICAgIH0gICAgXHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDIwMDBweCkge1xyXG4gICAgLm1hdC1zbmFjay1iYXItY29udGFpbmVyIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCkhaW1wb3J0YW50O1xyXG4gICAgfSAgICBcclxufVxyXG5cclxuXHJcbi8qKioqKioqKioqKiBJTlBVVCBGSUVMRFMgKioqKioqKioqKioqKi9cclxuXHJcbjo6bmctZGVlcCB7XHJcbiAgICAubWF0LWZvcm0tZmllbGQtaW5maXgge1xyXG4gICAgICAgIGJvcmRlci10b3A6IDAuNDM3NWVtIHNvbGlkIHRyYW5zcGFyZW50O1xyXG4gICAgfVxyXG59IiwiLyogWW91IGNhbiBhZGQgZ2xvYmFsIHN0eWxlcyB0byB0aGlzIGZpbGUsIGFuZCBhbHNvIGltcG9ydCBvdGhlciBzdHlsZSBmaWxlcyAqL1xuaHRtbCwgYm9keSB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG5ib2R5IHtcbiAgbWFyZ2luOiAwO1xuICBmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG59XG5cbmh0bWwge1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDE4MDBweCkge1xuICBodG1sIHtcbiAgICBmb250LXNpemU6IGNhbGMoMTNweCArIDYgKiAoKDEwMHZ3IC0gMTgwMHB4KSAvIDQwMCkpO1xuICB9XG59XG4vKioqKioqKiBDT0xPUiBQQUxFVFRFICoqKioqKioqKioqKi9cbi8qIFNDU1MgSEVYICovXG4vKiBTQ1NTIEhTTCAqL1xuLyogU0NTUyBSR0IgKi9cbi8qIFNDU1MgR3JhZGllbnQgKi9cbi8qKioqKioqIFNDUk9MTEJBUiAqKioqKioqKioqL1xuKjo6LXdlYmtpdC1zY3JvbGxiYXIsXG4qOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XG4gIHdpZHRoOiAxNXB4O1xuICBib3JkZXItcmFkaXVzOiAxM3B4O1xuICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xuICBib3JkZXI6IDVweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbio6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgMTBweDtcbn1cblxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG4vKioqKioqKioqIE5PVElGSUNBVElPTlMgKioqKioqKioqKi9cbi5zdWNjZXNzIHtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDMwLCAxNTUsIDUzLCAwLjY3MSkgIWltcG9ydGFudDtcbn1cbi5zdWNjZXNzIC5tYXQtYnV0dG9uLXdyYXBwZXIge1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5lcnJvciB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M0MzQwNCAhaW1wb3J0YW50O1xufVxuLmVycm9yIC5tYXQtYnV0dG9uLXdyYXBwZXIge1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi8qKioqKioqKioqKiBCVVRUT05TICoqKioqKioqKioqKioqKioqL1xuOjpuZy1kZWVwIC5tYXQtc3Ryb2tlZC1idXR0b24ge1xuICB3aWR0aDogNHZ3ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogNHZoICFpbXBvcnRhbnQ7XG4gIG1pbi13aWR0aDogZml0LWNvbnRlbnQ7XG4gIGZvbnQtc2l6ZTogMWVtO1xufVxuXG4vKioqKioqKioqKiBUT0dMRVMgKioqKioqKioqKioqKi9cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDIwMDBweCkge1xuICAubWF0LXNsaWRlLXRvZ2dsZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xuICB9XG59XG4vKioqKioqKioqIFNMSURFUlMgKioqKioqKioqKioqKioqKi9cbjo6bmctZGVlcCAubWF0LXNsaWRlci1ob3Jpem9udGFsIHtcbiAgbWluLXdpZHRoOiA4dnc7XG59XG5cbi8qKioqKioqKiogQ0hFQ0tCT1ggKioqKioqKioqKioqL1xuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMjAwMHB4KSB7XG4gIC5tYXQtY2hlY2tib3gtaW5uZXItY29udGFpbmVyIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDIwMDBweCkge1xuICAubWF0LXNuYWNrLWJhci1jb250YWluZXIge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KSAhaW1wb3J0YW50O1xuICB9XG59XG4vKioqKioqKioqKiogSU5QVVQgRklFTERTICoqKioqKioqKioqKiovXG46Om5nLWRlZXAgLm1hdC1mb3JtLWZpZWxkLWluZml4IHtcbiAgYm9yZGVyLXRvcDogMC40Mzc1ZW0gc29saWQgdHJhbnNwYXJlbnQ7XG59XG5cbi5wYXJhZ3JhcGgsIC5maXhhdGlvbi1kdXJhdGlvbi1iYXIsIC5wYXJhZ3JhcGgtaWQsIC5wYXJhZ3JhcGgtZmVhdHVyZXMsIC5wYXJhZ3JhcGgtcmVsZXZhbmNlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi5wYXJhZ3JhcGgtaWQsIC5wYXJhZ3JhcGgtZmVhdHVyZXMge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XG4gIHRleHQtc2hhZG93OiAwIDAgYmxhY2s7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuM3MgZWFzZTtcbn1cblxuLnBhcmFncmFwaC1pZCB7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZWZlZjtcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCByZ2JhKDE4NywgMTgzLCAxODMsIDAuOSk7XG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDJweDtcbiAgei1pbmRleDogMjtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5wYXJhZ3JhcGgtZmVhdHVyZXMge1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIGhlaWdodDogMTAwJTtcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCByZ2JhKDE4NywgMTgzLCAxODMsIDAuOSk7XG4gIGJvcmRlci10b3A6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG4ucGFyYWdyYXBoLWZlYXR1cmVzIC5mZWF0dXJlIHtcbiAgbWFyZ2luOiA1cHggM3B4O1xuICBwYWRkaW5nOiA1cHggMDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkIHJnYmEoMTg3LCAxODMsIDE4MywgMC4yKTtcbn1cbi5wYXJhZ3JhcGgtZmVhdHVyZXMgLmZlYXR1cmUgLmZlYXR1cmUtbmFtZSB7XG4gIGZsZXgtZ3JvdzogNDtcbiAgbWFyZ2luLWxlZnQ6IDAuM3Z3O1xufVxuLnBhcmFncmFwaC1mZWF0dXJlcyAuZmVhdHVyZSAuZmVhdHVyZS12YWx1ZSB7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIG1hcmdpbjogMCA0cHggMCA2cHg7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBmbGV4LWdyb3c6IDE7XG59XG5cbi5wYXJhZ3JhcGgtZmVhdHVyZXM6aG92ZXIge1xuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xufVxuXG4ucGFyYWdyYXBoLXJlbGV2YW5jZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogbGVmdDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi5wYXJhZ3JhcGgtcmVsZXZhbmNlIC5yZWxldmFuY2UtY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMik7XG59XG4ucGFyYWdyYXBoLXJlbGV2YW5jZSAucmVsZXZhbmNlLWNvbnRhaW5lciAucmVsZXZhbmNlIHtcbiAgbWFyZ2luOiAwLjV2aCAwLjF2dyAwLjV2aCAwLjV2dztcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5wYXJhZ3JhcGgtcmVsZXZhbmNlIC5yZWxldmFuY2UtY29udGFpbmVyIC5yZWxldmFuY2UgLnJlbGV2YW5jZS1uYW1lIHtcbiAgZmxleC1ncm93OiAxO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4uYmFkZ2UsIC5iYWRnZS1wbGFjZWhvbGRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiAzNXB4O1xuICBwYWRkaW5nOiAwIDAuNnZ3O1xuICBtYXJnaW46IDAuNnZoIDAuMnZ3O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDAuOTVlbTtcbn1cblxuLnRmLWJhZGdlIHtcbiAgd2lkdGg6IDEyJTtcbiAgbWF4LXdpZHRoOiAxMiU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmMGVmZWY7XG4gIGNvbG9yOiBibGFjaztcbn1cblxuLnByb2JhYmlsaXR5LWJhZGdlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NiZTJmOTtcbiAgY29sb3I6ICMwYjVjYWQ7XG59XG5cbi5jaXJjdWxhci1iYWRnZS1jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uY2lyY3VsYXItYmFkZ2UtY29udGFpbmVyIC5jaXJjdWxhci1iYWRnZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDAlO1xuICBib3R0b206IDUwJTtcbiAgd2lkdGg6IDEuMXZ3O1xuICBoZWlnaHQ6IDEuMXZ3O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHBhZGRpbmc6IDA7XG4gIGZvbnQtc2l6ZTogMC42ZW07XG59XG5cbi5tYXRjaC1iYWRnZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM4MGYwYjM7XG4gIGNvbG9yOiAjMWU5YjM1O1xufVxuXG4udW5tYXRjaC1iYWRnZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmMDg1ODU7XG4gIGNvbG9yOiAjYjMwNjA2O1xufVxuXG4qOjotd2Via2l0LXNjcm9sbGJhcixcbio6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgd2lkdGg6IDE1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDEzcHg7XG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gIGJvcmRlcjogNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuKjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAxMHB4O1xufVxuXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59Il19 */"] });


/***/ }),

/***/ 1461:
/*!********************************************!*\
  !*** ./src/app/facade/data/data.facade.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataFacade": () => (/* binding */ DataFacade)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 1486);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 2597);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 88);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 3466);
/* harmony import */ var _models_document_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/document.model */ 4296);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _api_user_user_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api/user/user.api */ 994);
/* harmony import */ var _state_data_data_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../state/data/data.state */ 5528);
/* harmony import */ var _api_document_document_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api/document/document.api */ 4190);
/* harmony import */ var src_app_services_notifications_notifications_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/notifications/notifications.service */ 98);








class DataFacade {
    constructor(userApi, dataState, documentApi, notificationService) {
        this.userApi = userApi;
        this.dataState = dataState;
        this.documentApi = documentApi;
        this.notificationService = notificationService;
        this.document$ = this.dataState.getDocument$();
        this.fixationArea$ = this.dataState.getFixationArea$();
        this.userIds$ = this.userApi.getIds().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.shareReplay)(1));
        this.documentIds$ = this.documentApi.getIds().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.shareReplay)(1));
        this.initializeDataState();
    }
    /**
     *  Initialize the data state.
     */
    initializeDataState() {
        let docId = "";
        let userId = "";
        this.dataState.setUpdating(true);
        (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.combineLatest)([this.userIds$, this.documentIds$])
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.first)())
            .subscribe(([userIds, documentIds]) => {
            docId = documentIds[0];
            userId = userIds[0];
            this.loadDocument(userId, docId);
        }, (error) => {
            console.log(error);
            this.dataState.setUpdating(false);
        });
    }
    /** The data state is being updated */
    isUpdating$() {
        return this.dataState.isUpdating$();
    }
    /**
     * @returns all possible user ids
     */
    getUserIds$() {
        return this.userIds$;
    }
    /**
     * @returns all possible document ids
     */
    getDocumentIds$() {
        return this.documentIds$;
    }
    /**
     * @returns loaded document
     */
    getDocument$() {
        return this.document$;
    }
    getFixationArea$() {
        return this.fixationArea$;
    }
    /**
     * Reloads the current document.
     */
    reloadDocument() {
        let userId = "";
        let docId = "";
        this.dataState.getDocument$().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1)).subscribe(document => {
            userId = document.userId;
            docId = document.id;
        });
        this.loadDocument(userId, docId);
    }
    /**
     * Loads a document.
     * @param userId user id
     * @param docId document id
     */
    loadDocument(userId, docId) {
        let fixationArea;
        this.dataState.setUpdating(true);
        this.dataState.getFixationArea$().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1)).subscribe((data) => { fixationArea = data; });
        (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.combineLatest)([
            this.documentApi.getDocLayout(userId, docId),
            this.documentApi.getDocFeatures(userId, docId),
            this.documentApi.getDocRelevance(userId, docId),
            this.documentApi.getDocFixation(userId, docId, fixationArea)
        ]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.first)()).subscribe((results) => {
            this.dataState.setDocLayout(results[0]);
            this.dataState.setDocFeatures(results[1]);
            this.dataState.setDocRelevance(results[2]);
            this.dataState.setDocFixation(results[3]);
            this.dataState.setDocument(new _models_document_model__WEBPACK_IMPORTED_MODULE_0__.Document(results[0], results[1], results[2], results[3]));
        }, (error) => {
            console.log(error);
        }, () => {
            this.notificationService.showSuccess("Data loaded");
        }).add(() => { this.dataState.setUpdating(false); });
    }
    /**
     * Sets the fixation area and reloads the current document's fixation times considering the new fixation
     * area configuration.
     * @param fixationArea new fixation area
     */
    setFixationArea(fixationArea) {
        let userId = "";
        let docId = "";
        this.dataState.setUpdating(true);
        this.dataState.getDocument$().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1)).subscribe(document => {
            userId = document.userId;
            docId = document.id;
        });
        this.loadDocumentFixation(fixationArea, userId, docId);
    }
    /**
     * Loads the new document's per-token fixation times.
     * @param fixationArea fixation area configuration
     * @param userId user's id
     * @param docId document's id
     */
    loadDocumentFixation(fixationArea, userId, docId) {
        (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.combineLatest)([
            this.dataState.getDocLayout$(),
            this.dataState.getDocFeatures$(),
            this.dataState.getDocRelevance$(),
            this.documentApi.getDocFixation(userId, docId, fixationArea)
        ]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.first)()).subscribe((results) => {
            this.dataState.setFixationArea(fixationArea);
            this.dataState.setDocFixation(results[3]);
            this.dataState.setDocument(new _models_document_model__WEBPACK_IMPORTED_MODULE_0__.Document(results[0], results[1], results[2], results[3]));
        }, (error) => {
            console.log(error);
        }, () => {
            this.notificationService.showSuccess("Data loaded");
        }).add(() => { this.dataState.setUpdating(false); });
    }
}
DataFacade.ɵfac = function DataFacade_Factory(t) { return new (t || DataFacade)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_api_user_user_api__WEBPACK_IMPORTED_MODULE_1__.UserApi), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_state_data_data_state__WEBPACK_IMPORTED_MODULE_2__.DataState), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_api_document_document_api__WEBPACK_IMPORTED_MODULE_3__.DocumentApi), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](src_app_services_notifications_notifications_service__WEBPACK_IMPORTED_MODULE_4__.NotificationsService)); };
DataFacade.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({ token: DataFacade, factory: DataFacade.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 4899:
/*!**********************************************************!*\
  !*** ./src/app/facade/label-level/label-level.facade.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LabelLevelFacade": () => (/* binding */ LabelLevelFacade)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 1486);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 3927);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _data_data_facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/data.facade */ 1461);
/* harmony import */ var src_app_state_label_level_label_level_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/state/label-level/label-level.state */ 714);





class LabelLevelFacade {
    constructor(dataFacade, labelState) {
        this.dataFacade = dataFacade;
        this.labelState = labelState;
        this.colors = ["#dfdef7ff",
            "#c8d5f2ff",
            "#b1ccedff",
            "#a1d6c6ff",
            "#90e09fff",
            "#d6cd5fff",
            "#d8ab56ff",
            "#e1813fff",
            "#e95727ff",
            "#ff401fff"];
        this.isLabelLevelEnabled$ = this.labelState.isEnabled$();
        this.minFixation$ = this.labelState.getMinFixation$();
        this.maxFixation$ = this.labelState.getMaxFixation$();
        this.colorGradient = this.initColorGradient();
    }
    /**
     * Initialize the color gradient.
     * @returns canvas rendering context of the color gradient
     */
    initColorGradient() {
        let context = null;
        const WIDTH = 101;
        const HEIGHT = 1;
        // Canvas
        const canvasElement = document.createElement("CANVAS");
        canvasElement.width = 101;
        canvasElement.height = 1;
        context = canvasElement.getContext("2d");
        if (context) {
            // Gradient
            const gradient = context.createLinearGradient(0, 0, WIDTH, 0); // x0, y0, x1, y1
            const step = 0.1; //1 / (this.colors.length - 1); // need to validate at least two colors in gradientColors
            let val = 0;
            this.colors.forEach(color => {
                gradient.addColorStop(val, color);
                val += step;
            });
            // Fill with gradient
            context.fillStyle = gradient;
            context.fillRect(0, 0, WIDTH, HEIGHT); // x, y, width, height   
        }
        return context;
    }
    /**
     * Computes the color of a certain point in the fixation duration range.
     * @param fixationDuration a fixation duration
     * @param alpha transparency of the rgb colors
     */
    getColor$(fixationDuration, alpha = 0.7) {
        const a = alpha;
        const defaultColor = `rgb(255, 255, 255, 1)`; // white;
        let color = defaultColor;
        let percent = 0;
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.combineLatest)([this.minFixation$,
            this.maxFixation$,
            this.isLabelLevelEnabled$]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(([min, max, enabled]) => {
            color = defaultColor;
            if (enabled && fixationDuration != undefined) {
                percent = ((fixationDuration - min) / max) * 100;
                percent = Math.min(100, percent);
                if (percent >= 0 && this.colorGradient != null) {
                    const colorObj = this.colorGradient.getImageData(percent, 0, 1, 1);
                    const rgba = colorObj.data;
                    color = `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${a})`;
                }
            }
            return color;
        }));
    }
    /** Some state is being updated */
    isUpdating$() {
        return (this.dataFacade.isUpdating$() || this.labelState.isUpdating$());
    }
    /** The label-level is enabled */
    isEnabled$() {
        return this.labelState.isEnabled$();
    }
    /**
     * @returns the mimimum visualized fixation.
     */
    getMinFixation$() {
        return this.minFixation$;
    }
    /**
     * @returns the maximum visualized fixation.
     */
    getMaxFixation$() {
        return this.maxFixation$;
    }
    /**
     * @returns
     */
    getFixationArea$() {
        return this.dataFacade.getFixationArea$();
    }
    /**
     * @param isEnabled the label level is enabled
     */
    setEnabled(isEnabled) {
        this.labelState.setEnabled(isEnabled);
    }
    /**
     * Sets the mimimum visualized fixation.
     * @param minFixation new minimum visualized fixation
     */
    setMinFixation(minFixation) {
        this.labelState.setUpdating(true);
        if (minFixation >= 0) {
            this.labelState.setMinFixation(minFixation);
        }
        else {
            console.error('The minimum visualized fixation cannot be negative');
        }
        this.labelState.setUpdating(false);
    }
    /**
     * Sets the maximum visualized fixation.
     * @param maxFixation new maximum visualized fixation
     */
    setMaxFixation(maxFixation) {
        this.labelState.setUpdating(true);
        this.labelState.setMaxFixation(maxFixation);
        this.labelState.setUpdating(false);
    }
    /**
     * Sets the fixation area.
     * @param fixationArea fixation area
     */
    setFixationArea(fixationArea) {
        this.dataFacade.setFixationArea(fixationArea);
    }
}
LabelLevelFacade.ɵfac = function LabelLevelFacade_Factory(t) { return new (t || LabelLevelFacade)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_data_data_facade__WEBPACK_IMPORTED_MODULE_0__.DataFacade), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](src_app_state_label_level_label_level_state__WEBPACK_IMPORTED_MODULE_1__.LabelLevelState)); };
LabelLevelFacade.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: LabelLevelFacade, factory: LabelLevelFacade.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 4010:
/*!******************************************************************!*\
  !*** ./src/app/facade/paragraph-level/paragraph-level.facade.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParagraphLevelFacade": () => (/* binding */ ParagraphLevelFacade)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_state_paragraph_level_paragraph_level_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/state/paragraph-level/paragraph-level.state */ 5403);


class ParagraphLevelFacade {
    constructor(paragraphLevelState) {
        this.paragraphLevelState = paragraphLevelState;
    }
    /**
     * @returns The paragraph-level state is being updated
     */
    isUpdating$() {
        return this.paragraphLevelState.isUpdating$();
    }
    /**
     * @returns The paragraph-level state is enabled
     */
    isEnabled$() {
        return this.paragraphLevelState.isEnabled$();
    }
    /**
     * @returns the paragraph features' configuration
     */
    getFeaturesConf$() {
        return this.paragraphLevelState.getFeaturesConf$();
    }
    /**
     * @param isEnabled the paragraph level is to be enabled or not.
     */
    setDisabled(isEnabled) {
        this.paragraphLevelState.setEnabled(isEnabled);
    }
    /**
     *
     * @param features new paragraph features' configuration
     */
    setFeaturesConf(featuresConf) {
        this.paragraphLevelState.setUpdating(true);
        this.paragraphLevelState.setFeaturesConf(featuresConf);
        this.paragraphLevelState.setUpdating(false);
    }
}
ParagraphLevelFacade.ɵfac = function ParagraphLevelFacade_Factory(t) { return new (t || ParagraphLevelFacade)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](src_app_state_paragraph_level_paragraph_level_state__WEBPACK_IMPORTED_MODULE_0__.ParagraphLevelState)); };
ParagraphLevelFacade.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ParagraphLevelFacade, factory: ParagraphLevelFacade.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 4296:
/*!******************************************!*\
  !*** ./src/app/models/document.model.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Document": () => (/* binding */ Document)
/* harmony export */ });
/* harmony import */ var _paragraph_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./paragraph.model */ 7022);

/**
 * Document representation.
 */
class Document {
    /**
     *
     * @param docLayout text and layout
     * @param docFeatures paragraph features
     * @param docRelevance paragraph relevance
     * @param docFixation fixation times
     */
    constructor(docLayout, docFeatures, docRelevance, docFixation) {
        this.userId = docLayout.userId;
        this.id = docLayout.id;
        this.corpus = docLayout.corpus;
        this.query = docLayout.query;
        this.paragraphs = docLayout.paragraphs.map((par_layout) => {
            let par_id = par_layout.id;
            let par_features = docFeatures.paragraphs.find((par) => par.id === par_id);
            let par_relevance = docRelevance.paragraphs.find((par) => par.id === par_id);
            let par_fixation = docFixation.paragraphs.find((par) => par.id === par_id);
            return new _paragraph_model__WEBPACK_IMPORTED_MODULE_0__.Paragraph(par_layout, par_features, par_relevance, par_fixation);
        });
    }
}


/***/ }),

/***/ 2878:
/*!***********************************************!*\
  !*** ./src/app/models/fixation-area.model.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FixationArea": () => (/* binding */ FixationArea)
/* harmony export */ });
class FixationArea {
    constructor(leftMargin, rightMargin) {
        this.leftMargin = leftMargin;
        this.rightMargin = rightMargin;
    }
}


/***/ }),

/***/ 3515:
/*!***************************************!*\
  !*** ./src/app/models/label.model.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Label": () => (/* binding */ Label)
/* harmony export */ });
/**
 * Label representation
 */
class Label {
    /**
     *
     * @param labelLayout text and layout
     * @param labelFixation fixation time
     */
    constructor(labelLayout, labelFixation) {
        this.fixationDuration = 0.0;
        this.id = labelLayout.id;
        this.x1 = labelLayout.x1;
        this.y1 = labelLayout.y1;
        this.x2 = labelLayout.x2;
        this.y2 = labelLayout.y2;
        this.text = labelLayout.text;
        if (labelFixation != undefined)
            this.fixationDuration = Label.transFixDuration(labelFixation.fixationDuration);
    }
    /**
     * Transforms the fixation duration to the corresponding units.
     * @param duration in seconds
     * @returns durations in miliseconds
     */
    static transFixDuration(duration) {
        return (duration * 1000);
    }
    get width() {
        return this.x2 - this.x1;
    }
    get height() {
        return this.y2 - this.y1;
    }
}


/***/ }),

/***/ 7022:
/*!*******************************************!*\
  !*** ./src/app/models/paragraph.model.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Paragraph": () => (/* binding */ Paragraph)
/* harmony export */ });
/* harmony import */ var _label_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./label.model */ 3515);

/**
 * Paragraph representation.
 */
class Paragraph {
    /**
     *
     * @param parLayout text and layout
     * @param parFeatures paragraph features
     * @param parRelevance paragraph relevance
     * @param parFixation fixation times
     */
    constructor(parLayout, parFeatures, parRelevance, parFixation) {
        this.systemRelevance = false;
        this.perceivedRelevance = false;
        this.predictedRelevance = [-1, false];
        this.labels = [];
        this.features = {};
        this.id = parLayout.id;
        this.x1 = parLayout.x1;
        this.y1 = parLayout.y1;
        this.x2 = parLayout.x2;
        this.y2 = parLayout.y2;
        if (parFeatures != undefined) {
            this.features = parFeatures.features;
        }
        if (parRelevance != undefined) {
            this.systemRelevance = parRelevance.systemRelevance;
            this.perceivedRelevance = parRelevance.perceivedRelevance;
            this.predictedRelevance = parRelevance.predictedRelevance;
        }
        if (parFixation != undefined) {
            this.labels = parLayout.labels.map((label_layout) => {
                let label_id = label_layout.id;
                let label_fixation = parFixation.labels.find((label) => label.id === label_id);
                return new _label_model__WEBPACK_IMPORTED_MODULE_0__.Label(label_layout, label_fixation);
            });
        }
    }
    get isTitle() {
        return this.id == -1;
    }
    get hasFeatures() {
        return this.id >= 0 && Object.keys(this.features).length > 0;
    }
    get hasLabels() {
        return this.labels.length > 0;
    }
    getFeatureById(id) {
        let value = -1;
        Object.entries(this.features).forEach(([key, v]) => {
            if (key == id) {
                value = v;
            }
        });
        return value;
    }
    get width() {
        return this.x2 - this.x1;
    }
    get height() {
        return this.y2 - this.y1;
    }
}


/***/ }),

/***/ 6689:
/*!*******************************************************************************!*\
  !*** ./src/app/services/global-error-handler/global-error-handler.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalErrorHandlerService": () => (/* binding */ GlobalErrorHandlerService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _notifications_notifications_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../notifications/notifications.service */ 98);


class GlobalErrorHandlerService {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    /**
     * Handles an error.
     * @param error any error
     */
    handleError(error) {
        console.error('An error occurred:', error.message);
        this.notificationsService.showError('Error: ' + error.message);
    }
}
GlobalErrorHandlerService.ɵfac = function GlobalErrorHandlerService_Factory(t) { return new (t || GlobalErrorHandlerService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_notifications_notifications_service__WEBPACK_IMPORTED_MODULE_0__.NotificationsService)); };
GlobalErrorHandlerService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GlobalErrorHandlerService, factory: GlobalErrorHandlerService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 9056:
/*!*************************************************************************************!*\
  !*** ./src/app/services/global-http-interceptor/global-http-interceptor.service.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalHttpInterceptorService": () => (/* binding */ GlobalHttpInterceptorService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 3882);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 1134);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 5871);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 7859);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 8293);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 1258);
/* harmony import */ var _notifications_notifications_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../notifications/notifications.service */ 98);






class GlobalHttpInterceptorService {
    constructor(router, notificationsService) {
        this.router = router;
        this.notificationsService = notificationsService;
    }
    /**
     * Intercepts and processes every HTTP error.
     * @param req HTTP request
     * @param next HTTP handler
     * @returns
     */
    intercept(req, next) {
        return next.handle(req).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.retry)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.catchError)((error) => {
            let handled = false;
            if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpErrorResponse) {
                if (error.error instanceof ErrorEvent) {
                    console.error("Error Event");
                }
                else {
                    console.log(`error status : ${error.status} ${error.statusText}`);
                    switch (error.status) {
                        case 0:
                            handled = true;
                            this.notificationsService.showError("The connection to the server cannot be established.");
                            break;
                        case 404:
                            handled = true;
                            this.notificationsService.showError("The solicited data is not currently available.");
                            break;
                        case 500:
                            handled = true;
                            this.notificationsService.showError("An internal server error has ocurred. Try again later.");
                            break;
                        default:
                            this.notificationsService.showError("An unidentified error has ocurred");
                    }
                }
            }
            else {
                console.error("Other Errors");
            }
            if (handled) {
                // return back
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(error);
            }
            else {
                // throw error back to the subscriber
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(error);
            }
        }));
    }
}
GlobalHttpInterceptorService.ɵfac = function GlobalHttpInterceptorService_Factory(t) { return new (t || GlobalHttpInterceptorService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_notifications_notifications_service__WEBPACK_IMPORTED_MODULE_0__.NotificationsService)); };
GlobalHttpInterceptorService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({ token: GlobalHttpInterceptorService, factory: GlobalHttpInterceptorService.ɵfac });


/***/ }),

/***/ 98:
/*!*****************************************************************!*\
  !*** ./src/app/services/notifications/notifications.service.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationsService": () => (/* binding */ NotificationsService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/snack-bar */ 8456);


class NotificationsService {
    constructor(snackBar) {
        this.snackBar = snackBar;
        this.SUCCESS_CONF = {
            panelClass: ['success'],
            duration: 2000
        };
        this.ERROR_CONF = {
            panelClass: ['error'],
            duration: 4000
        };
    }
    /**
     * Shows a success notification.
     * @param msg message to be displayed
     */
    showSuccess(msg) {
        this.snackBar.open(msg, 'x', this.SUCCESS_CONF);
    }
    /**
     * Shows an error success.
     * @param msg message to be displayed
     */
    showError(msg) {
        // The second parameter is the text in the button. 
        // In the third, we send in the css class for the snack bar.
        this.snackBar.open(msg, 'x', this.ERROR_CONF);
    }
}
NotificationsService.ɵfac = function NotificationsService_Factory(t) { return new (t || NotificationsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__.MatSnackBar)); };
NotificationsService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: NotificationsService, factory: NotificationsService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 5528:
/*!******************************************!*\
  !*** ./src/app/state/data/data.state.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataState": () => (/* binding */ DataState)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 6491);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 3413);
/* harmony import */ var src_app_models_fixation_area_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/models/fixation-area.model */ 2878);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);



class DataState {
    constructor() {
        this.updating$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(false);
        this.documentLayout$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject(1);
        this.documentFeatures$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject(1);
        this.documentRelevance$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject(1);
        this.documentFixation$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject(1);
        this.document$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject(1);
        this.fixationArea$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(new src_app_models_fixation_area_model__WEBPACK_IMPORTED_MODULE_0__.FixationArea(0, 0));
    }
    /**
     * @returns the app state is being updated (`true`) or not (`false`)
     */
    isUpdating$() {
        return this.updating$.asObservable();
    }
    /**
     * @returns current document's layout
     */
    getDocLayout$() {
        return this.documentLayout$.asObservable();
    }
    /**
     * @returns current document's features
     */
    getDocFeatures$() {
        return this.documentFeatures$.asObservable();
    }
    /**
     * @returns current document's relevance
     */
    getDocRelevance$() {
        return this.documentRelevance$.asObservable();
    }
    /**
     * @returns current document's fixation times
     */
    getDocFixation$() {
        return this.documentFixation$.asObservable();
    }
    /**
     * @returns current document
     */
    getDocument$() {
        return this.document$.asObservable();
    }
    getFixationArea$() {
        return this.fixationArea$.asObservable();
    }
    /**
     * @param isUpdating `true` if the state has been updated, `false` if the state
     * is going to be updated
     */
    setUpdating(isUpdating) {
        this.updating$.next(isUpdating);
    }
    /**
     * Sets the new document's layout
     * @param docLayout document's layout
     */
    setDocLayout(docLayout) {
        return this.documentLayout$.next(docLayout);
    }
    /**
     * Sets the new document's paragraph features
     * @param docFeatures document's paragraph features
     */
    setDocFeatures(docFeatures) {
        return this.documentFeatures$.next(docFeatures);
    }
    /**
     * Sets the new document's paragraph relevance
     * @param docRelevance document's paragraph relevance
     */
    setDocRelevance(docRelevance) {
        return this.documentRelevance$.next(docRelevance);
    }
    /**
     * Sets the new document's fixation times
     * @param docFixation document's fixation times per token
     */
    setDocFixation(docFixation) {
        return this.documentFixation$.next(docFixation);
    }
    /**
     * Sets the new document.
     * @param doc new document
     */
    setDocument(doc) {
        this.document$.next(doc);
    }
    /**
     * Sets the new fixation area.
     * @param fixationArea new fixation area configuration
     */
    setFixationArea(fixationArea) {
        this.fixationArea$.next(fixationArea);
    }
}
DataState.ɵfac = function DataState_Factory(t) { return new (t || DataState)(); };
DataState.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: DataState, factory: DataState.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 714:
/*!********************************************************!*\
  !*** ./src/app/state/label-level/label-level.state.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LabelLevelState": () => (/* binding */ LabelLevelState)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 6491);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);


class LabelLevelState {
    constructor() {
        this.updating$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
        this.enabled$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(true);
        this.minFixation$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(50);
        this.maxFixation$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(600);
    }
    /**
     * @returns the label-level state is being updated (`true`) or not (`false`)
     */
    isUpdating$() {
        return this.updating$.asObservable();
    }
    /**
     * @returns the label-level state is enabled (`true`) or disabled (`false`)
     */
    isEnabled$() {
        return this.enabled$.asObservable();
    }
    /**
     * @returns minimum fixation time (ms) to be visualized
     */
    getMinFixation$() {
        return this.minFixation$.asObservable();
    }
    /**
     * @returns maximum fixation time (ms) to be visualized
     */
    getMaxFixation$() {
        return this.maxFixation$.asObservable();
    }
    /**
     * @param isUpdating `false` if the state has been updated, `true` if the state
     * is going to be updated
     */
    setUpdating(isUpdating) {
        this.updating$.next(isUpdating);
    }
    /**
     * @param isEnabled the label level has to be enabled
     */
    setEnabled(isEnabled) {
        return this.enabled$.next(isEnabled);
    }
    /**
     * @param minFixation new minimum fixation time (ms)
     */
    setMinFixation(minFixation) {
        this.minFixation$.next(minFixation);
    }
    /**
     * @param maxFixation new maximum fixation time (ms)
     */
    setMaxFixation(maxFixation) {
        this.maxFixation$.next(maxFixation);
    }
}
LabelLevelState.ɵfac = function LabelLevelState_Factory(t) { return new (t || LabelLevelState)(); };
LabelLevelState.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: LabelLevelState, factory: LabelLevelState.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 5403:
/*!****************************************************************!*\
  !*** ./src/app/state/paragraph-level/paragraph-level.state.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParagraphLevelState": () => (/* binding */ ParagraphLevelState)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 6491);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);


const featuresConf = [
    { id: "f_total_time", name: "Total time", transform: 1.0, units: "", enabled: false },
    { id: "f_fixn_n", name: "Number of fixations", transform: 1.0, units: "", enabled: false },
    { id: "f_fixn_dur_sum", name: "Sum fixation duration", transform: 1.0, units: "s", enabled: false },
    { id: "f_fixn_dur_avg", name: "Avg. fixation duration", transform: 1000.0, units: "ms", enabled: true },
    { id: "f_fixn_dur_sd", name: "Sd. fixation duration", transform: 1000.0, units: "ms", enabled: false },
    { id: "f_scan_distance_h", name: "Scan distance horizontal", transform: 1.0, units: "", enabled: false },
    { id: "f_scan_distance_v", name: "Scan distance vertical", transform: 1.0, units: "", enabled: false },
    { id: "f_scan_distance_euclid", name: "Scan distance euclidean", transform: 1.0, units: "", enabled: true },
    { id: "f_scan_hv_ratio", name: "Scan hv ratio", transform: 1.0, units: "", enabled: false },
    { id: "f_avg_sacc_length", name: "Avg. saccade length", transform: 1.0, units: "", enabled: false },
    { id: "f_scan_speed_h", name: "Scan speed horizontal", transform: 1.0, units: "", enabled: false },
    { id: "f_scan_speed_v", name: "Scan speed vertical", transform: 1.0, units: "", enabled: false },
    { id: "f_scan_speed", name: "Scan speed", transform: 1.0, units: "", enabled: true },
    { id: "f_box_area", name: "Box area", transform: 1.0, units: "", enabled: true },
    { id: "f_box_area_per_time", name: "Box area per time", transform: 1.0, units: "", enabled: false },
    { id: "f_fixns_per_box_area", name: "Fixations per box area", transform: 1.0, units: "", enabled: false },
    { id: "f_hull_area_per_time", name: "Hull area per time", transform: 1.0, units: "", enabled: false },
    { id: "f_fixns_per_hull_area", name: "Fixations per hull area", transform: 1.0, units: "", enabled: false }
];
class ParagraphLevelState {
    constructor() {
        this.featuresConf$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(featuresConf);
        this.updating$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(false);
        this.enabled$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(true);
    }
    /**
     * @returns the paragraph-level state is being updated (`true`) or not (`false`)
     */
    isUpdating$() {
        return this.updating$.asObservable();
    }
    /**
     * @returns the paragraph level is enabled
     */
    isEnabled$() {
        return this.enabled$.asObservable();
    }
    /**
     * @returns paragraph features' configuration
     */
    getFeaturesConf$() {
        return this.featuresConf$.asObservable();
    }
    /**
     * @param isUpdating `false` if the state has been updated, `true` if the state
     * is going to be updated
     */
    setUpdating(isUpdating) {
        this.updating$.next(isUpdating);
    }
    /**
     * @param isEnabled the paragraph level has to be enabled
     */
    setEnabled(isEnabled) {
        this.enabled$.next(isEnabled);
    }
    /**
     * @param featureseConf new paragraph features' configuration
     */
    setFeaturesConf(featureseConf) {
        this.featuresConf$.next(featureseConf);
    }
}
ParagraphLevelState.ɵfac = function ParagraphLevelState_Factory(t) { return new (t || ParagraphLevelState)(); };
ParagraphLevelState.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ParagraphLevelState, factory: ParagraphLevelState.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
const environment = {
    production: false,
    //API_URL: "http://127.0.0.1:5001/api"
    API_URL: "https://iml.dfki.de/demos/rematool/api"
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 1570);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map