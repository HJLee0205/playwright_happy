// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Common
 */
const pageUrl = 'http://happytest.spc.co.kr/' // Dev
// const pageUrl = 'https://happy.spc.co.kr/'    // Prod


/**
 * 페이지 접속
 */
test('페이지 접속', async ({ page }) => {
  await page.goto(pageUrl);

  // 최초 페이지 진입 여부 확인
  await expect(page).toHaveTitle(/GFS/);
});


/**
 * 2. 로그인
 */
test('로그인', async ({ page }) => {

  // 페이지 접속
  await page.goto(pageUrl);
  const content = page.frameLocator('frame[name="content"]');

  // 로그인 ID/PW 입력
  await content
      .locator('[name="P_USER_ID"]')
      .fill('cndfactory');
  await content
      .locator('[name="P_USER_PW_TEMP"]')
      .fill('sys1234');

  // 로그인 버튼 클릭
  await content
      .locator('#login_box06')
      .click();

  // 로그인 성공 및 페이지 진입 확인
  await expect(page).toHaveTitle(/해피구매시스템/);

});


/**
 * 3. 신규 품목생성
 */
test ('신규 품목생성', async ({ page }) => {

});