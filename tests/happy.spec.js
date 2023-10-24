// @ts-check
const { test, expect } = require('@playwright/test');


/** Common *********************/
const pageUrl = 'http://happytest.spc.co.kr/'   // Dev
// const pageUrl = 'https://happy.spc.co.kr/'      // Prod

var loginId = 'sg639'
var loginPw = 'sys1234'


/** Test Case *********************/

/**
 * 1. 페이지 접속
 */
test('1. 페이지 접속', async ({ page }) => {
  await page.goto(pageUrl);

  // 최초 페이지 진입 여부 확인
  await expect(page).toHaveTitle(/GFS/);
});


/**
 * 2. 로그인 / 로그아웃
 */
test('2. 로그인 / 로그아웃', async ({ page }) => {

  // 페이지 접속
  await page.goto(pageUrl);

  // 로그인 페이지 정보
  const loginPage = page.frameLocator('frame[name="content"]');

  // 로그인 ID/PW 입력
  await loginPage.locator('[name="P_USER_ID"]')
      .fill(loginId);
  await loginPage.locator('[name="P_USER_PW_TEMP"]')
      .fill(loginPw);

  // 로그인 버튼 클릭
  await loginPage.locator('#login_box06')
      .click();

  // 로그인 및 페이지 진입 확인 (6초이내)
  await expect(page).toHaveURL(/main/, { timeout: 6000 });
  console.log('1. 로그인 성공');

  // 로그아웃 버튼 클릭
  await page.locator('.todolist_btn > a')
      .first()
      .click();

  // 로그아웃 확인
  await expect(page).not.toHaveURL(/main/);
  console.log('2. 로그아웃 성공');

});


/**
 * 3. 신규 품목생성
 */
test ('3. 신규 품목생성', async ({ page }) => {

  // 페이지 접속 및 로그인 확인
  await page.goto(pageUrl);
  const content = page.frameLocator('frame[name="content"]');
  await content.locator('[name="P_USER_ID"]').fill(loginId);
  await content.locator('[name="P_USER_PW_TEMP"]').fill(loginPw);
  await content.locator('#login_box06').click();
  await expect(page).toHaveURL(/main/, { timeout: 6000 });

  // 메뉴 진입 (기준정보 > 품목관리 > )
  await page.getByRole('link', { name: '기준정보' })
      .first()
      .click();

  await page.getByRole('link', { name: '품목관리' })
      .click();

  await page.getByRole('link', { name: '품목관리' })
      .click();

  await page.getByRole('link', { name: '- 품목 생성요청' })
      .click();

});