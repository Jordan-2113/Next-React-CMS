import * as React from "react";
import PageHead from "../components/page-head";
import ContentRow, { ContentRowPlaceholder } from "../components/content-row";
import { TabView, TabViewBtn, TabViewEl, TabViewBtnRow } from "../components/tab-view";
import StyledButton, { StyledButtonRow, StyledButtonRowItem } from "../components/styled-button";
import { PopupSidePanelContext } from "../components/popup-side-panel";
import { motion } from "framer-motion";
import Form from "../components/form";
import { TextField, TextareaField, SelectField, RadioField, CheckboxField, DatePickerField, FileField, TagField, SwitchCaseField, TimeField, MultipleField, EditorField } from "../components/fields";
import Grid, { GridItem } from "../components/grid";
import Card from "../components/card";
import MultipleImagesRow from "../components/multiple-images-row";
import StatusTag from "../components/status-tag";
import BulkSelectBar, { BulkSelectBarCheckbox, BulkSelectBarItem } from "../components/bulk-select-bar";
import { CaseField } from "../components/fields/switch-case";
import FieldHolder, { FieldHolderEl, FieldHolderTitle } from "../components/field-holder";
import PureTable, { PureTablePlaceholder } from "../components/pure-table";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LanguageOption from "../components/language-option";
import Search from "../components/search";
import Promise from "bluebird";
import ValueBuilder from "../components/value-builder";
import { serializeToQueryString } from "../helper";
import SortOption from "../components/sort-option";
import Controls, { ControlEl, ControlSpace } from "../components/controls";
import { authFetch } from "../contexts/auth";
import { ScopeReloadButton, VariableScopeProvider } from "../components/variable-scope";
import Pagination from "../components/pagination";
import ChartHolder from "../components/chart-holder";
import { toast } from "react-toastify";
import { Box, Col, Row } from "../components/layout";

Promise.config({ cancellation: true });

export const shouldShowPanel = true;
export const requiredLogin = false;

const Template = () => {
    const popupSidePanel = React.useContext(PopupSidePanelContext);
    const fetchRequest = React.useCallback(query => new Promise(async (resolve, reject, onCancel) => {
        const controller = new AbortController();
        onCancel(() => controller.abort());
        try {
            const resp = await authFetch(`https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum?${serializeToQueryString({ ...query, size: 10 })}`, { signal: controller.signal });
            if (!resp.ok) {
                return reject(new Error(resp.status));
            }
            resolve(await resp.json().then(data => new Promise(resolve => setTimeout(() => {
                resolve(data)
            }, 1000))));
        } catch (e) {
            reject(e);
        }
    }), []);
    const barChartData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const lineChartData = {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    }

    const handleSubmit = (data) => {
        console.log(data);
    }

    const renderPlaceholder = () => {
        return new Array(5).fill("").map((el, idx) => {
            return (
                <ContentRowPlaceholder key={idx} picture attr description />
            )
        })
    }

    const renderCell = ({ value: id }) => {
        if (id == null) {
            return (<></>);
        }
        return (
            <div className="button-row">
                <div className="button-row--item">
                    <StyledButton themes={[ 'light' ]}>
                        <Link to={`edit/${id}`}>
                            <FontAwesomeIcon icon={[ 'fas', 'edit' ]} size="lg" />
                            <div className="a11y">修改</div>
                        </Link>
                    </StyledButton>
                </div>
                <div className="button-row--item">
                    <StyledButton themes={[ 'light' ]}>
                        <Link to={`delete/${id}`}>
                            <FontAwesomeIcon icon={[ 'fas', 'trash' ]} size="lg" />
                            <div className="a11y">刪除</div>
                        </Link>
                    </StyledButton>
                </div>
            </div>
        )
    }

    return (
        <div>
            <VariableScopeProvider extendQuery>
                <PageHead>Async Loader</PageHead>
                <Controls>
                    <ControlEl>
                        <LanguageOption langs={[ { code: "tc", label: "繁中" }, { code: "sc", label: "簡中" }, { code: "en", label: "英文" } ]} />
                    </ControlEl>
                    <ControlEl>
                        <ScopeReloadButton />
                    </ControlEl>
                    <ControlSpace />
                    <ControlEl>
                        <SortOption options={[{ id: "1", label: "參考編號" }, { id: "2", label: "修改日期" }]} />
                    </ControlEl>
                </Controls>
                <ValueBuilder promise={fetchRequest} placeholder={renderPlaceholder()}>
                    { data => (
                        <>
                            { data.map((el, idx) => <ContentRow
                                key={idx}
                                title={el.short_sentence}
                                description={el.very_long_sentence}
                                picture=" "
                                actions={[
                                    { label: "Edit", href: "/abc" },
                                    { label: "Delete", href: "/efg" },
                                ]}
                            />) }
                        </>
                    ) }
                </ValueBuilder>
                <Pagination maxPage={5} pageCount={10} label={idx => idx} getLinkParams={idx => ({ p: idx })} />
            </VariableScopeProvider>
            <PageHead actions={[ { label: "新增範本", href: "/abc" } ]}>範本<small>1個</small></PageHead>
            <Search types={[ { key: "t", label: "標題" }, { key: "s", label: "來源" } ]}>
                { ({ register, state: { errors }, getValues }, params) => {
                    return (
                        <FieldHolder>
                            <FieldHolderEl>
                                <SelectField
                                    title="下拉式選單"
                                    defaultValue={params != null ? params["s"] : ""}
                                    {...register("s")}
                                >
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </SelectField>
                            </FieldHolderEl>
                        </FieldHolder>
                    )
                } }
            </Search>
            <Form onSubmit={handleSubmit} shouldUnregister={true}>
                { ({ register, state: { errors }, getValues, unregister }) => {
                    return (
                        <FieldHolder>
                            <FieldHolderEl col={6}>
                                <TextField
                                    title="Text"
                                    errorMsg={errors.text?.message}
                                    {...register("text", {
                                        required: {
                                            message: "請輸入信息",
                                            value: true
                                        }
                                    })}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl col={6}>
                                <TextField
                                    title="Mask Text"
                                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    placeholder="(000) 000-0000"
                                    errorMsg={errors.masktext?.message}
                                    {...register("masktext", {
                                        required: {
                                            message: "請輸入信息",
                                            value: true
                                        }
                                    })}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <TextareaField
                                    title="abc"
                                    {...register("textarea", {
                                        required: {
                                            message: "請輸入信息",
                                            value: true
                                        }
                                    })}
                                    errorMsg={errors.textarea?.message}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <SelectField
                                    title="下拉式選單"
                                    {...register("select", {
                                        required: {
                                            message: "請輸入信息",
                                            value: true
                                        }
                                    })}
                                    errorMsg={errors.select?.message}
                                >
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </SelectField>
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <RadioField
                                    title="多選一"
                                    {...register("radio", {
                                        required: {
                                            message: "請輸入信息",
                                            value: true
                                        }
                                    })}
                                    errorMsg={errors.radio?.message}
                                    options={[ { label: "不限", value: "0" }, { label: "中文", value: "1" }, { label: "英文", value: "2" } ]}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl col={6}>
                                <CheckboxField
                                    title="多選最少一個"
                                    errorMsg={errors.checkbox?.message}
                                    options={[ { label: "不限", value: "0" }, { label: "中文", value: "1" }, { label: "英文", value: "2" } ]}
                                    {...register("checkbox", {
                                        validate: () => getValues("checkbox").length > 0 ? true : "請最少選擇一個"
                                    })}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl col={6}>
                                <CheckboxField
                                    title="可選"
                                    options={[ { label: "不限", value: "0" }, { label: "中文", value: "1" }, { label: "英文", value: "2" } ]}
                                    {...register("othercheckbox")}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <DatePickerField
                                    title="選擇日期"
                                    min="2021-07-05"
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <TimeField
                                    title="選擇時間"
                                />
                            </FieldHolderEl>
                            <FieldHolderEl col={6}>
                                <FileField
                                    title="檔案"
                                    {...register("file", {
                                        required: {
                                            message: "請輸入信息",
                                            value: true
                                        }
                                    })}
                                    errorMsg={errors.file?.message}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl col={6}>
                                <FileField
                                    title="檔案"
                                    accept=".pdf"
                                    placeholder="只限 pdf"
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <TagField
                                    title="標簽"
                                    {...register("tagsinput", {
                                        shouldUnregister: true,
                                        validate: () => getValues("tags")?.length > 0 ? true : "請最少輸入一個"
                                    })}
                                    buildTagProps={(idx) => register(`tags[${idx}]`)}
                                    errorMsg={errors.tagsinput?.message}
                                    // values={[ "abc", "abc12345" ]}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <SwitchCaseField
                                    title="領取方式"
                                    errorMsg={errors.switch?.message}
                                    {...register("switch", {
                                        required: {
                                            message: "請輸入信息",
                                            value: true
                                        }
                                    })}
                                >
                                    <CaseField name="優惠卡">
                                        <TextField
                                            errorMsg={errors.offer?.message}
                                            {...register("offer", {
                                                shouldUnregister: true,
                                                required: {
                                                    message: "請輸入信息",
                                                    value: true
                                                }
                                            })}
                                        />
                                    </CaseField>
                                    <CaseField name="會員碼" />
                                </SwitchCaseField>
                            </FieldHolderEl>
                            <FieldHolderTitle>其他資料</FieldHolderTitle>
                            <FieldHolderEl>
                                <MultipleField
                                    title="Mulitple"
                                    values={[]}
                                    renderRemove={({ index: idx, value }) => <TextField type="hidden" value={value} { ...register(`removeEls.${idx}`) } />}
                                >
                                    { ({ value, id }) => (
                                        <TextField
                                            key={id}
                                            errorMsg={errors.mulitple != null && errors.mulitple[id]?.message}
                                            defaultValue={value.v}
                                            {...register(`mulitple.${id}`, {
                                                shouldUnregister: true,
                                                required: {
                                                    message: "請輸入信息",
                                                    value: true
                                                }
                                            })}
                                        />
                                    ) }
                                </MultipleField>
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <EditorField
                                    title="Editor"
                                    errorMsg={errors.editor?.message}
                                    {...register("editor", {
                                        shouldUnregister: true,
                                        required: {
                                            message: "請輸入信息",
                                            value: true
                                        }
                                    })}
                                />
                            </FieldHolderEl>
                            <FieldHolderEl>
                                <StyledButton themes={["normal"]}>
                                    <button type='submit'>提交</button>
                                </StyledButton>
                            </FieldHolderEl>
                        </FieldHolder>
                    )
                } }
            </Form>
            <TabView initialView="tc" labels={[ { id: "tc", name: "中文" }, { id: "en", name: "英文" } ]}>
                <TabViewBtnRow>
                    <TabViewBtn for="tc" />
                    <TabViewBtn for="en" />
                </TabViewBtnRow>
                <TabViewEl id="tc">
                    <ContentRow
                        title="禮頓建築（亞洲）有限公司"
                        description="禮頓亞洲於1975年成立，總部設於香港，其享負盛名的基建工程遍及整個亞洲。 作為業界領導，除隧道、鐵路及道路工程外，禮頓亞洲更承辦多項再生能源之基建工程，當中包括公用規模的風力發電項目，地熱及廢物轉化發電設施。他們的樓宇項目涵蓋學校、大使館、豪華的住宅高樓及大型娛樂綜合大樓，當中多個項目均依照國際綠色建築及能源效益標準蓋建。 他們的使命是確保項目交付給客戶，並為員工營造安全、滿足和充實的工作環境，從而為股東帶來可持續的回報現時，禮頓亞洲之業務涵蓋香港、澳門、新加坡、菲律賓、印尼、馬來西亞及印度。 禮頓亞洲為 CIMIC 集團成員之一，集團成立於1899年，為工程建築、採礦、服務和公私合作夥伴的領導者。"
                        picture="https://via.placeholder.com/150"
                        attributes={{ "參考編號": "C000001" }}
                        actions={[
                            { href: "/abcdefg", label: "修改公司" },
                            { href: "./edit", label: "刪除公司", requiredConfirm: true },
                            { href: "https://www.google.com", label: "預覽" }
                        ]}
                    />
                </TabViewEl>
                <TabViewEl id="en">
                    <ContentRow
                        title="禮頓建築（亞洲）有限公司"
                        description="禮頓亞洲於1975年成立，總部設於香港，其享負盛名的基建工程遍及整個亞洲。 作為業界領導，除隧道、鐵路及道路工程外，禮頓亞洲更承辦多項再生能源之基建工程，當中包括公用規模的風力發電項目，地熱及廢物轉化發電設施。他們的樓宇項目涵蓋學校、大使館、豪華的住宅高樓及大型娛樂綜合大樓，當中多個項目均依照國際綠色建築及能源效益標準蓋建。 他們的使命是確保項目交付給客戶，並為員工營造安全、滿足和充實的工作環境，從而為股東帶來可持續的回報現時，禮頓亞洲之業務涵蓋香港、澳門、新加坡、菲律賓、印尼、馬來西亞及印度。 禮頓亞洲為 CIMIC 集團成員之一，集團成立於1899年，為工程建築、採礦、服務和公私合作夥伴的領導者。"
                        picture="https://via.placeholder.com/150"
                        attributes={{ "參考編號": "C000002" }}
                    />
                    <ContentRowPlaceholder picture description attr />
                </TabViewEl>
                <StyledButtonRow>
                    <StyledButtonRowItem>
                        <StyledButton>
                            <motion.button whileTap={{ scale: 0.9 }} onClick={() => popupSidePanel.push("abc", "testing", <div>testing2</div>)}>開啓 Panel</motion.button>
                        </StyledButton>
                    </StyledButtonRowItem>
                    <StyledButtonRowItem>
                        <StyledButton>
                            <motion.button whileTap={{ scale: 0.9 }} onClick={() => toast("通知")}>顯示通知</motion.button>
                        </StyledButton>
                    </StyledButtonRowItem>
                </StyledButtonRow>
            </TabView>
            <TabView initialView="tc" labels={[ { id: "tc", name: "一部分欄位" }, { id: "en", name: "另一部分欄位" } ]}>
                <TabViewBtnRow>
                    <TabViewBtn for="tc" />
                    <TabViewBtn for="en" />
                </TabViewBtnRow>
                <TabViewEl id="tc">
                    <FieldHolder>
                        <FieldHolderEl>
                            <TextField title="Text" />
                        </FieldHolderEl>
                        <FieldHolderEl>
                            <TextareaField title="abc" />
                        </FieldHolderEl>
                        <FieldHolderEl>
                            <SelectField title="下拉式選單">
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </SelectField>
                        </FieldHolderEl>
                        <FieldHolderEl col={6}>
                            <RadioField
                                title="多選一"
                                options={[ { label: "不限", value: "0" }, { label: "中文", value: "1" }, { label: "英文", value: "2" } ]}
                            />
                        </FieldHolderEl>
                        <FieldHolderEl col={6}>
                            <CheckboxField
                                title="多選最少一個"
                                options={[ { label: "不限", value: "0" }, { label: "中文", value: "1" }, { label: "英文", value: "2" } ]}
                            />
                        </FieldHolderEl>
                        <FieldHolderEl>
                            <FileField title="檔案" accept=".pdf" placeholder="只限 pdf" />
                        </FieldHolderEl>
                    </FieldHolder>
                </TabViewEl>
                <TabViewEl id="en">
                    <FieldHolder>
                        <FieldHolderEl>
                            <TextField title="Text" />
                        </FieldHolderEl>
                        <FieldHolderEl>
                            <EditorField title="Editor" />
                        </FieldHolderEl>
                        <FieldHolderEl>
                            <SwitchCaseField title="領取方式">
                                <CaseField name="優惠卡">
                                    <TextField />
                                </CaseField>
                                <CaseField name="會員碼" />
                            </SwitchCaseField>
                        </FieldHolderEl>
                        <FieldHolderEl>
                            <TagField title="標簽" />
                        </FieldHolderEl>
                    </FieldHolder>
                </TabViewEl>
            </TabView>
            <PageHead>Grid Holder</PageHead>
            <Grid padding={5}>
                <GridItem>
                    <Card
                        picture="https://via.placeholder.com/1920x1000"
                        title="[義工] 建造業義工嘉許禮2020 – 延期舉行"
                        description="因應疫情影響，原定於7月19日 (星期日) 舉行的「建造業義工嘉..."
                        actions={[ { label: "More", href: "." } ]}
                    />
                </GridItem>
                <GridItem>
                    <Card
                        picture="https://via.placeholder.com/1920x1000"
                        title="[義工] 建造業義工嘉許禮2020 – 延期舉行"
                        description="因應疫情影響，原定於7月19日 (星期日) 舉行的「建造業義工嘉..."
                        actions={[ { label: "More", href: "." } ]}
                    />
                </GridItem>
                <GridItem>
                    <Card
                        picture="https://via.placeholder.com/1920x1000"
                        title="[義工] 建造業義工嘉許禮2020 – 延期舉行"
                        description="因應疫情影響，原定於7月19日 (星期日) 舉行的「建造業義工嘉..."
                        actions={[ { label: "More", href: "." } ]}
                    />
                </GridItem>
                <GridItem>
                    <Card
                        picture="https://via.placeholder.com/1920x1000"
                        title="[義工] 建造業義工嘉許禮2020 – 延期舉行"
                        description="因應疫情影響，原定於7月19日 (星期日) 舉行的「建造業義工嘉..."
                        actions={[ { label: "More", href: "." } ]}
                    />
                </GridItem>
                <GridItem>
                    <Card
                        picture="https://via.placeholder.com/1920x1000"
                        title="[義工] 建造業義工嘉許禮2020 – 延期舉行"
                        description="因應疫情影響，原定於7月19日 (星期日) 舉行的「建造業義工嘉..."
                        actions={[ { label: "More", href: "." } ]}
                    />
                </GridItem>
            </Grid>
            <Box>
                <Row gutterWidth={20} includeYAxisPadding xs={1} xl={2}>
                    <Col>
                        <ChartHolder ratio={1.3 / 2} type="bar" data={barChartData} options={{ maintainAspectRatio: false }} />
                    </Col>
                    <Col>
                        <Row gutterWidth={10} includeYAxisPadding>
                            <Col md={6}>
                                <ChartHolder ratio={1.3 / 2} type="line" data={lineChartData} options={{ maintainAspectRatio: false }} />
                            </Col>
                            <Col md={6}>
                                <ChartHolder ratio={1.3 / 2} type="line" data={lineChartData} options={{ maintainAspectRatio: false }} />
                            </Col>
                            <Col md={6}>
                                <ChartHolder ratio={1.3 / 2} type="line" data={lineChartData} options={{ maintainAspectRatio: false }} />
                            </Col>
                            <Col md={6}>
                                <ChartHolder ratio={1.3 / 2} type="line" data={lineChartData} options={{ maintainAspectRatio: false }} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Box>
            <StatusTag status="active">Active</StatusTag>
            <StatusTag status="active">Published</StatusTag>
            <StatusTag status="warning">Pending</StatusTag>
            <StatusTag status="error">Closed</StatusTag>
            <MultipleImagesRow
                title="[義工] 建造業義工嘉許禮2020 – 延期舉行"
                description="因應疫情影響，原定於7月19日 (星期日) 舉行的「建造業義工嘉許禮2020」，將延期至11月15日 (星期日)，於建造業零碳天地舉行。建造業議會亦將每年7月定為「魯班服務月」，以發揚及承傳魯班先師的精神。"
                actions={[ { label: "Edit Offer", href: "/" }, { label: "Delete Offer", href: "/" } ]}
                pictures={[ { label: "相片 (手機 1920x800)", path: "https://via.placeholder.com/1920x800" }, { label: "相片 (桌上 1920x800)", path: "https://via.placeholder.com/1920x800" } ]}
                attributes={{ "參考編號": "C000001" }}
            />
            <PageHead>Tables</PageHead>
            <Box>
                <PureTable
                    columns={[
                        { Header: 'Column 1', accessor: 'col1' },
                        { Header: 'Column 2', accessor: 'col2'},
                        { Header: 'Actions', accessor: 'id', Cell: renderCell }
                    ]}
                    data={[
                        { id: "1", col1: 'Hello', col2: 'World' },
                        { id: "2", col1: 'react-table', col2: 'rocks' },
                        { col1: 'whatever', col2: 'you want' },
                    ]}
                />
            </Box>
            <Box>
                <PureTablePlaceholder
                    columns={[
                        { Header: 'Column 1', accessor: 'col1' },
                        { Header: 'Column 2', accessor: 'col2'},
                        { Header: 'Actions', accessor: 'id' }
                    ]}
                    dataLength={20}
                />
            </Box>
            <PageHead>Selectable</PageHead>
            <BulkSelectBar template="你選擇了 {0} 間公司。" actions={[ { onClick: ids => window.alert("/href"), label: "刪除公司", requiredConfirm: true } ]}>
                { [1, 2, 3].map(el => {
                    return (
                        <BulkSelectBarItem itemId={el} key={el}>
                            <ContentRow
                                title="禮頓建築（亞洲）有限公司"
                                description="禮頓亞洲於1975年成立，總部設於香港，其享負盛名的基建工程遍及整個亞洲。 作為業界領導，除隧道、鐵路及道路工程外，禮頓亞洲更承辦多項再生能源之基建工程，當中包括公用規模的風力發電項目，地熱及廢物轉化發電設施。他們的樓宇項目涵蓋學校、大使館、豪華的住宅高樓及大型娛樂綜合大樓，當中多個項目均依照國際綠色建築及能源效益標準蓋建。 他們的使命是確保項目交付給客戶，並為員工營造安全、滿足和充實的工作環境，從而為股東帶來可持續的回報現時，禮頓亞洲之業務涵蓋香港、澳門、新加坡、菲律賓、印尼、馬來西亞及印度。 禮頓亞洲為 CIMIC 集團成員之一，集團成立於1899年，為工程建築、採礦、服務和公私合作夥伴的領導者。"
                                picture="https://via.placeholder.com/150"
                                attributes={{ "參考編號": `C00000${el}` }}
                                actions={[
                                    { href: "/abcdefg", label: "修改公司" },
                                    { href: "./edit", label: "刪除公司", requiredConfirm: true },
                                    { href: "https://www.google.com", label: "預覽" }
                                ]}
                            />
                        </BulkSelectBarItem>
                    )
                }) }
            </BulkSelectBar>
            <BulkSelectBar template="你選擇了 {0} 張卡。" actions={[ { onClick: ids => window.alert("/href"), label: "刪除公司", requiredConfirm: true } ]}>
                <Grid padding={8}>
                    { [1, 2, 3].map(el => {
                        return (
                            <GridItem key={el}>
                                <BulkSelectBarItem itemId={el}>
                                    <Card
                                        title="禮頓建築（亞洲）有限公司"
                                        description="禮頓亞洲於1975年成立，總部設於香港，其享負盛名的基建工程遍及整個亞洲。 作為業界領導，除隧道、鐵路及道路工程外，禮頓亞洲更承辦多項..."
                                        picture="https://via.placeholder.com/150"
                                        attributes={{ "參考編號": `C00000${el}`, "Publish Date:": "2021-09-01" }}
                                        actions={[
                                            { href: "/abcdefg", label: "修改公司" },
                                            { href: "./edit", label: "刪除公司", requiredConfirm: true }
                                        ]}
                                    />
                                </BulkSelectBarItem>
                            </GridItem>
                        )
                    }) }
                </Grid>
            </BulkSelectBar>
            <BulkSelectBar template="你選擇了 {0} 行。" actions={[ { onClick: ids => window.alert(ids), label: "刪除公司", requiredConfirm: true } ]}>
                <Box>
                    <PureTable
                        columns={[
                            {
                                Header: () => <BulkSelectBarCheckbox selectAll itemId={null} />,
                                id: "select",
                                width: 30,
                                accessor: 'id',
                                Cell: ({ value: id }) => <BulkSelectBarCheckbox itemId={id} />
                            },
                            { Header: 'Column 1', accessor: 'col1' },
                            { Header: 'Column 2', accessor: 'col2'},
                            { Header: 'Actions', accessor: 'id', Cell: renderCell }
                        ]}
                        data={[
                            { id: "1", col1: 'Hello', col2: 'World' },
                            { id: "2", col1: 'react-table', col2: 'rocks' },
                            { id: "3", col1: 'whatever', col2: 'you want' },
                        ]}
                    />
                </Box>
            </BulkSelectBar>
            <PageHead>Charts</PageHead>
            <Box>
                <ChartHolder ratio={1 / 2} type="bar" data={barChartData} options={{ maintainAspectRatio: false }} />
            </Box>
            <Box>
                <ChartHolder ratio={1 / 2} type="line" data={lineChartData} options={{ maintainAspectRatio: false }} />
            </Box>
        </div>
    )
}

Template.captureQueryParams = [];

Template.initiator = () => new Promise(async (resolve, reject, onCancel) => {
    const controller = new AbortController();
    onCancel(() => controller.abort());
    try {
        const resp = await authFetch(`https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum?${serializeToQueryString({ size: 10 })}`, { signal: controller.signal });
        if (!resp.ok) {
            return reject(new Error(resp.status));
        }
        resolve({
            props: await resp.json().then(data => new Promise(resolve => setTimeout(() => {
                resolve(data)
            }, 1000)))
        });
    } catch (e) {
        reject(e);
    }
})

export default Template;