import * as React from "react";
import Card from "../components/card";
import Grid, { GridItem } from "../components/grid";
import AuthContext from '../contexts/auth';

const capitalizeFirstLetter = string => {
    if (string == null) {
        return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Index = () => {
    const authContext = React.useContext(AuthContext);

    return (
        <div>
            <h2>你好 {capitalizeFirstLetter(authContext.payload?.username)}！</h2>
            <p>請選擇以下的項目以進行修改：</p>
            <Grid padding={5}>
                <GridItem>
                    <Card
                        title="橫幅"
                        description="新增、修改、刪除橫幅以顯示最新資訊以及圖片。"
                        actions={[ { href: "/banner", label: "前往" } ]}
                    />
                </GridItem>
                <GridItem>
                    <Card
                        title="消息中心"
                        description="新增、修改、刪除消息中心以顯示最新資訊以及圖片。"
                        actions={[ { href: "/service", label: "前往" } ]}
                    />
                </GridItem>
                <GridItem>
                    <Card
                        title="專業團隊"
                        description="新增、修改、刪除專業團隊以顯示最新資訊以及圖片。"
                        actions={[ { href: "/specialty", label: "前往" } ]}
                    />
                </GridItem>
                <GridItem>
                    <Card
                        title="醫生"
                        description="新增、修改、刪除醫生以顯示最新資訊以及圖片。"
                        actions={[ { href: "/doctor", label: "前往" } ]}
                    />
                </GridItem>
                <GridItem>
                    <Card
                        title="使用者"
                        description="新增、修改、刪除使用者以讓使用者使用登入功能。"
                        actions={[ { href: "/user", label: "前往" } ]}
                    />
                </GridItem>
            </Grid>
        </div>
    )
}

export default Index;